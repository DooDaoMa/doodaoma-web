import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { Button, Input, Section } from '../../components'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { Message } from '../../types/message'

type IImagingFormValue = {
  targetName: string
  ra: string
  dec: string
  filter: string
  quantity: string
  duration: string
}

export default function Imaging() {
  const { currentUser } = useAppSelector(userSelector)

  return (
    <>
      {currentUser !== null ? (
        <ImagingWebSocket userId={currentUser.id} />
      ) : (
        'Connecting'
      )}
    </>
  )
}

function ImagingWebSocket({ userId }: { userId: string }) {
  const { register, handleSubmit } = useForm<IImagingFormValue>({
    defaultValues: {
      targetName: '',
      ra: '',
      dec: '',
      filter: '',
      quantity: '',
      duration: '',
    },
  })
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL || 'ws://localhost:8080'}/web`,
    {
      queryParams: {
        userId: userId,
        deviceId: 'Test Device Id',
      },
      onError: (event) => {
        console.error(event)
        toast.error('Connect to WebSocket failed')
      },
      onOpen: () => {
        toast.success('Connected successfully')
        sendJsonMessage({ type: 'getFilterWheelOptions' })
      },
    },
  )

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) {
      return
    }
    if (lastJsonMessage === null) {
      return
    }
    const message = lastJsonMessage as unknown as Message

    switch (message.type) {
      case 'sendMessage': {
        toast.info(message.payload.message)
        break
      }
    }
  }, [lastJsonMessage, readyState])

  const onAcquireImage: SubmitHandler<IImagingFormValue> = (value) => {
    console.log(value)
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Imaging</h1>
      <Section>
        <form onSubmit={handleSubmit(onAcquireImage)}>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input label="Target Name" {...register('targetName')} />
            <Input label="RA / Right Asc.(hrs)" {...register('ra')} />
          </div>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input label="DEC / Declination (deg)" {...register('dec')} />
            <Input label="Filter" {...register('filter')} />
          </div>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input label="Qty" {...register('quantity')} />
            <Input label="Duration (seconds)" {...register('duration')} />
          </div>
          <Button type="submit">Acquire images</Button>
        </form>
      </Section>
    </>
  )
}

Imaging.requireAuth = true
