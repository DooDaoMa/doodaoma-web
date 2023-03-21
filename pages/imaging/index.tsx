import { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { Button, Input, Section } from '../../components'
import { Checkbox } from '../../components/atoms/Checkbox'
import { Select } from '../../components/atoms/Select'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { Message } from '../../types/message'

interface IImagingForm {
  startSequence: {
    cooling: {
      temperature: number
      duration: number
    }
  }
  imagingSequence: {
    target: {
      name: string
      rotation: number
      ra: {
        hours: number
        minutes: number
        seconds: number
      }
      dec: {
        degrees: number
        minutes: number
        seconds: number
      }
    }
    tracking: {
      mode: 0 | 1 | 2 | 3 | 5
    }
    guiding: {
      forceCalibration: boolean
    }
    exposures: {
      gain: number
      time: number
      amount: number
      binning: number
      imageType: number
      filterPosition: number
    }[]
  }
  endSequence: {
    warming: {
      duration: number
    }
  }
}

export default function Imaging() {
  const { currentUser } = useAppSelector(userSelector)

  return (
    <>
      {currentUser !== null ? (
        <ImagingWebSocket userId={currentUser.id} />
      ) : (
        <p>Connecting</p>
      )}
    </>
  )
}

const defaultValues: IImagingForm = {
  startSequence: {
    cooling: {
      temperature: -10,
      duration: 5,
    },
  },
  imagingSequence: {
    target: {
      name: '',
      rotation: 0,
      ra: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      dec: {
        degrees: 0,
        minutes: 0,
        seconds: 0,
      },
    },
    tracking: {
      mode: 0,
    },
    guiding: {
      forceCalibration: false,
    },
    exposures: [
      {
        gain: 0,
        time: 300,
        amount: 1,
        binning: 1,
        imageType: 0,
        filterPosition: 0,
      },
      {
        gain: 0,
        time: 300,
        amount: 1,
        binning: 1,
        imageType: 0,
        filterPosition: 0,
      },
      {
        gain: 0,
        time: 300,
        amount: 1,
        binning: 1,
        imageType: 0,
        filterPosition: 0,
      },
    ],
  },
  endSequence: {
    warming: {
      duration: 5,
    },
  },
}

function ImagingWebSocket({ userId }: { userId: string }) {
  const { register, handleSubmit, control } = useForm<IImagingForm>({
    defaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagingSequence.exposures',
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
    console.log(message)

    switch (message.type) {
      case 'sendMessage': {
        toast.info(message.payload.message)
        break
      }
    }
  }, [lastJsonMessage, readyState])

  const onAcquireImage: SubmitHandler<IImagingForm> = (value) => {
    console.log(value)
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
                  {...register('imagingSequence.target.ra.hours', {
                    valueAsNumber: true,
                  })}
                />
                <Input
                  type="number"
                  label="Minutes"
                  {...register('imagingSequence.target.ra.minutes', {
                    valueAsNumber: true,
                  })}
                />
                <Input
                  type="number"
                  label="Seconds"
                  {...register('imagingSequence.target.ra.seconds', {
                    valueAsNumber: true,
                  })}
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
                  {...register('imagingSequence.target.dec.degrees', {
                    valueAsNumber: true,
                  })}
                />
                <Input
                  type="number"
                  label="Minutes"
                  {...register('imagingSequence.target.dec.minutes', {
                    valueAsNumber: true,
                  })}
                />
                <Input
                  type="number"
                  label="Seconds"
                  {...register('imagingSequence.target.dec.seconds', {
                    valueAsNumber: true,
                  })}
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
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Exposure</p>
            <Button
              btnStyle="secondary"
              onClick={() =>
                append({
                  amount: 1,
                  time: 300,
                  imageType: 0,
                  binning: 1,
                  gain: 100,
                  filterPosition: 0,
                })
              }>
              &#43; new item
            </Button>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-3 grid grid-cols-1 md:grid-cols-7 md:gap-6">
              <Input
                type="number"
                label="Amount"
                {...register(`imagingSequence.exposures.${index}.amount`, {
                  valueAsNumber: true,
                })}
              />
              <Input
                type="number"
                label="Time (s)"
                {...register(`imagingSequence.exposures.${index}.time`, {
                  valueAsNumber: true,
                })}
              />
              <Select
                label="Type"
                {...register(`imagingSequence.exposures.${index}.imageType`, {
                  valueAsNumber: true,
                })}>
                <option value={0}>LIGHT</option>
                <option value={1}>FLAT</option>
                <option value={2}>DARK</option>
                <option value={3}>BIAS</option>
                <option value={4}>DARKFLAT</option>
                <option value={5}>SNAPSHOT</option>
              </Select>
              <Select
                label="Binning"
                {...register(`imagingSequence.exposures.${index}.binning`)}>
                <option value={1}>1x1</option>
                <option value={2}>2x2</option>
                <option value={3}>3x3</option>
                <option value={4}>4x4</option>
              </Select>
              <Input
                type="number"
                label="Gain"
                {...register(`imagingSequence.exposures.${index}.gain`, {
                  valueAsNumber: true,
                })}
              />
              <Select
                label="Filter"
                {...register(
                  `imagingSequence.exposures.${index}.filterPosition`,
                  {
                    valueAsNumber: true,
                  },
                )}>
                <option value={0}>Red</option>
                <option value={1}>Green</option>
                <option value={2}>Blue</option>
                <option value={3}>Clear</option>
                <option value={4}>Ha</option>
                <option value={5}>OIII</option>
              </Select>
              <div className="flex items-end">
                <Button
                  className="h-fit py-1"
                  btnStyle="danger"
                  onClick={() => remove(index)}>
                  &times;
                </Button>
              </div>
            </div>
          ))}
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
