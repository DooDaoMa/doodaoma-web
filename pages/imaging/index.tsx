import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { JsonValue } from 'react-use-websocket/dist/lib/types'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { Loading, Section } from '../../components'
import { ImagingForm } from '../../components/molecules/ImagingForm'
import { selectImaging, setImagingStatus } from '../../store/features/imaging'
import { userSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IImagingForm, ImagingStatus } from '../../types/imaging'
import { Message } from '../../types/message'
import { degreesToDMS, timeDecimalToHMS } from '../../utils/dateTime'

export default function Imaging() {
  const { query } = useRouter()
  const { currentUser } = useAppSelector(userSelector)
  const ra = (query.ra || '') as string
  const dec = (query.dec || '') as string
  const name = (query.name || '') as string

  return (
    <>
      {currentUser !== null ? (
        <ImagingWebSocket
          userId={currentUser.id}
          ra={ra}
          dec={dec}
          name={name}
        />
      ) : (
        <Loading />
      )}
    </>
  )
}

function ImagingWebSocket({
  userId,
  ra,
  dec,
  name,
}: {
  userId: string
  ra: string
  dec: string
  name: string
}) {
  const dispatch = useAppDispatch()
  const { imagingStatus } = useAppSelector(selectImaging)
  const previousStateRef = useRef<ImagingStatus>()
  const isConnectedFirstTime = useRef(true)

  const computedRaDec = useMemo(() => {
    const convertedRa = timeDecimalToHMS(ra)
    const convertedDec = degreesToDMS(dec)
    return { ra: convertedRa, dec: convertedDec }
  }, [ra, dec])

  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/web`,
    {
      retryOnError: true,
      reconnectInterval: 10 * 1000,
      queryParams: {
        userId,
        deviceId: 'Test Device Id',
      },
      onError: (event) => {
        console.error(event)
        toast.error('Connect to WebSocket failed')
      },
      onOpen: () => {
        console.info('Connected to WebSocket successfully')
        if (isConnectedFirstTime.current) {
          toast.success('Connection established')
          isConnectedFirstTime.current = false
        } else {
          toast.success('Reconnected successfully')
        }
        sendJsonMessage({ type: 'getFilterWheelOptions' })
        sendJsonMessage({ type: 'getIsBusy' })
      },
      onClose: (event) => {
        console.info(event)
        if ([3000].includes(event.code)) {
          toast.error('Connection lost. Retry connecting...')
        }
      },
      shouldReconnect: (event) => {
        const shouldReconnect = [3000].includes(event.code)
        if (shouldReconnect) {
          dispatch(setImagingStatus('reconnecting'))
        }
        return shouldReconnect
      },
      onReconnectStop: () => {
        dispatch(setImagingStatus('not connect'))
      },
    },
  )

  useEffect(() => {
    if (lastJsonMessage === null) {
      return
    }
    const message = lastJsonMessage as unknown as Message
    console.info(message)

    switch (message.type) {
      case 'sendMessage': {
        toast.info(message.payload.message)
        break
      }
      case 'updateIsBusy': {
        const isBusy = message.payload.isBusy
        const newStatus = isBusy ? 'busy' : 'ready'
        dispatch(setImagingStatus(newStatus))
        if (previousStateRef.current === 'busy' && newStatus === 'ready') {
          toast.warning('Exposuring cancelled')
        }
        previousStateRef.current = newStatus
        break
      }
    }
  }, [lastJsonMessage, dispatch])

  useEffect(() => {
    switch (readyState) {
      case ReadyState.UNINSTANTIATED:
        dispatch(setImagingStatus('empty'))
        break
      case ReadyState.CLOSED:
        dispatch(setImagingStatus('not connect'))
        break
      case ReadyState.CONNECTING:
        dispatch(setImagingStatus('connecting'))
        break
      case ReadyState.OPEN:
        dispatch(setImagingStatus('ready'))
        break
    }
  }, [readyState, dispatch])

  const onAcquireImage = (value: IImagingForm) => {
    sendJsonMessage({
      type: 'runImagingSequence',
      payload: { ...value } as unknown as JsonValue,
    })
  }

  const onCancelExposuring = () => {
    dispatch(setImagingStatus('cancelling'))
    sendJsonMessage({ type: 'cancelRunningSequence' })
  }

  const status = useMemo(() => {
    switch (imagingStatus) {
      case 'empty':
        return { text: 'Empty', color: 'bg-zinc-500' }
      case 'not connect':
        return { text: 'Not connect', color: 'bg-red-500' }
      case 'reconnecting':
        return { text: 'Retrying connect', color: 'bg-blue-500' }
      case 'connecting':
        return { text: 'Connecting', color: 'bg-yellow-500' }
      case 'ready':
        return { text: 'Ready', color: 'bg-green-500' }
      case 'busy':
        return { text: 'Busy', color: 'bg-orange-500' }
      case 'cancelling':
        return { text: 'Cancelling', color: 'bg-amber-500' }
    }
  }, [imagingStatus])

  return (
    <>
      <Head>
        <title>Imaging</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Imaging</h1>
        <p className="flex items-center gap-2">
          Status: <span className="font-semibold">{status?.text}</span>
          <span
            className={`mt-1 inline-block h-3 w-3 rounded-full ${status?.color}`}></span>
        </p>
      </div>
      <Section>
        <ImagingForm
          initialFormValue={{
            name,
            ...computedRaDec,
          }}
          isBusy={imagingStatus === 'busy'}
          isSubmitButtonDisabled={
            imagingStatus === 'busy' || imagingStatus !== 'ready'
          }
          isCancelling={imagingStatus === 'cancelling'}
          onSubmit={onAcquireImage}
          onCancel={onCancelExposuring}
        />
      </Section>
    </>
  )
}

Imaging.requireAuth = true
