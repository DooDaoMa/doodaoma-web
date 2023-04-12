import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { JsonValue } from 'react-use-websocket/dist/lib/types'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { Button, Input, Section } from '../../components'
import { Checkbox } from '../../components/atoms/Checkbox'
import { Select } from '../../components/atoms/Select'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { IImagingForm, imagingFormDefaultValue } from '../../types/imaging'
import { Message } from '../../types/message'

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
  const { register, handleSubmit } = useForm<IImagingForm>({
    defaultValues: imagingFormDefaultValue,
  })
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL || 'ws://localhost:8080'}/web`,
    {
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
        sendJsonMessage({ type: 'getFilterWheelOptions' })
        sendJsonMessage({ type: 'getCurrentStatus' })
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
      case 'currentStatus': {
        toast.info('Current status ' + message.payload.status)
        break
      }
    }
  }, [lastJsonMessage, readyState])

  const onAcquireImage: SubmitHandler<IImagingForm> = (value) => {
    sendJsonMessage({
      type: 'runImagingSequence',
      payload: { ...value } as unknown as JsonValue,
    })
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Imaging</h1>
      <Section>
        <form onSubmit={handleSubmit(onAcquireImage)}>
          <p className="mb-3 text-lg font-bold">Cooling Camera</p>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <Input
              type="number"
              label="Temperature (°C)"
              {...register('startSequence.cooling.temperature', {
                valueAsNumber: true,
              })}
            />
            <Input
              type="number"
              label="Duration (minutes)"
              {...register('startSequence.cooling.duration', {
                valueAsNumber: true,
              })}
            />
          </div>
          <p className="mb-3 text-lg font-bold">Imaging</p>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <Input label="Name" {...register('imagingSequence.target.name')} />
            <Input
              label="Rotation"
              {...register('imagingSequence.target.rotation')}
            />
          </div>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div>
              <p className="text-sm font-semibold">
                RA / Right Asc. (hh:mm:ss)
              </p>
              <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-6">
                <Input
                  type="number"
                  label="Hours"
                  {...register('imagingSequence.target.ra.hours')}
                />
                <Input
                  type="number"
                  label="Minutes"
                  {...register('imagingSequence.target.ra.minutes')}
                />
                <Input
                  type="number"
                  label="Seconds"
                  {...register('imagingSequence.target.ra.seconds')}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">
                DEC / Declination (d:mm:ss)
              </p>
              <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-6">
                <Input
                  type="number"
                  label="Degrees"
                  {...register('imagingSequence.target.dec.degrees')}
                />
                <Input
                  type="number"
                  label="Minutes"
                  {...register('imagingSequence.target.dec.minutes')}
                />
                <Input
                  type="number"
                  label="Seconds"
                  {...register('imagingSequence.target.dec.seconds')}
                />
              </div>
            </div>
          </div>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <Select
              label="Tracking Mode"
              {...register('imagingSequence.tracking.mode', {
                valueAsNumber: true,
              })}>
              <option value={0}>Sidereal</option>
              <option value={1}>King</option>
              <option value={2}>Solar</option>
              <option value={3}>Lunar</option>
              <option value={5}>Stopped</option>
            </Select>
            <Checkbox
              label="Force Calibration"
              {...register('imagingSequence.guiding.forceCalibration')}
            />
          </div>
          <p className="text-sm font-semibold">Exposure</p>
          <div className="mb-3 grid grid-cols-1 md:grid-cols-4 md:gap-6">
            <Input
              type="number"
              label="Time (s)"
              {...register('imagingSequence.exposures.time', {
                valueAsNumber: true,
              })}
            />
            <Select
              label="Type"
              {...register('imagingSequence.exposures.imageType')}>
              <option value={'LIGHT'}>LIGHT</option>
              <option value={'FLAT'}>FLAT</option>
              <option value={'DARK'}>DARK</option>
              <option value={'BIAS'}>BIAS</option>
              <option value={'DARKFLAT'}>DARKFLAT</option>
              <option value={'SNAPSHOT'}>SNAPSHOT</option>
            </Select>
            <Select
              label="Binning"
              {...register('imagingSequence.exposures.binning')}>
              <option value={'1x1'}>1x1</option>
              <option value={'2x2'}>2x2</option>
              <option value={'3x3'}>3x3</option>
              <option value={'4x4'}>4x4</option>
            </Select>
            <Input
              type="number"
              label="Gain"
              {...register('imagingSequence.exposures.gain', {
                valueAsNumber: true,
              })}
            />
          </div>
          <p className="mb-3 text-lg font-bold">Warming Camera</p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <Input
              type="number"
              label="Duration (minutes)"
              {...register('endSequence.warming.duration', {
                valueAsNumber: true,
              })}
            />
          </div>
          <Button className="mt-6" type="submit">
            Acquire images
          </Button>
        </form>
      </Section>
    </>
  )
}

Imaging.requireAuth = true
