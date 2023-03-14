import {
  addDays,
  format,
  startOfToday,
  parseJSON,
  isSameHour,
  addMinutes,
  startOfYesterday,
} from 'date-fns'
import { useEffect, useState } from 'react'
import ScheduleSelector from 'react-schedule-selector'

import { Button, Modal, Section } from '../../components'
import { fetchTimeSlot, timeSlotSelector } from '../../store/features/timeslot'
import { userSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function ReservationPage() {
  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector(userSelector)
  const { timeSlotList, loadTimeSlotState } = useAppSelector(timeSlotSelector)

  const [schedule, setSchedule] = useState<Date[]>([])
  const [reservedList, setReservedList] = useState<Date[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const handleChange = (newSchedule: Date[]) => {
    setSchedule((prev) => {
      prev = [...newSchedule]
      return prev
    })
  }

  const getFormatSelectedTime = () => {
    const timeFormat = 'dd eee kk:mm'
    return `${format(schedule.at(0) || new Date(), timeFormat)} - ${format(
      schedule.at(schedule.length - 1) || new Date(),
      timeFormat,
    )}`
  }

  const onConfirm = () => {
    const reservedTime = schedule.map((time) => ({
      startTime: time,
      endTime: addMinutes(time, 59),
      username: currentUser,
      status: 'reserved',
    }))
    console.log(reservedTime)
  }

  const fetchReservedList = () => {
    dispatch(
      fetchTimeSlot({
        startTime: startOfYesterday(),
        endTime: addDays(startOfToday(), 7),
      }),
    )
  }
  useEffect(fetchReservedList, [dispatch])
  useEffect(() => {
    if (timeSlotList && timeSlotList?.length > 0) {
      setReservedList((prev) => {
        prev = [
          ...timeSlotList
            .filter((timeSlot) => timeSlot.status !== 'available')
            .map((timeSlot) => parseJSON(timeSlot.startTime)),
        ]
        return prev
      })
    }
  }, [timeSlotList])

  console.log(schedule)

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        handleIsOpen={setIsOpenModal}
        title="Confirm your reservation"
        handleSubmit={() => onConfirm()}>
        <h3 className="mb-2 text-xl font-semibold">Reserve time:</h3>
        <p>{getFormatSelectedTime()}</p>
      </Modal>
      <Section>
        <>
          <h1 className="section-title">Book the Telescope</h1>
          <p className="mb-8 text-lg">
            Select available date and time for reservation
          </p>
          {loadTimeSlotState.status === 'success' ? (
            <>
              <ScheduleSelector
                selection={schedule}
                minTime={16}
                maxTime={31}
                selectionScheme="linear"
                onChange={handleChange}
                columnGap="12 rem"
                rowGap="12 rem"
                dateFormat="D ddd"
                timeFormat="h aa"
                startDate={new Date('2023-03-13T09:00:00.000Z')}
                renderDateCell={(dateTime: Date, selected: boolean) => {
                  // const isAvailable = schedule.find((timeSlot) =>
                  //   isSameHour(timeSlot, dateTime),
                  // )
                  const reserved = reservedList?.find((timeSlot) =>
                    isSameHour(timeSlot, dateTime),
                  )
                  return (
                    <>
                      <button
                        className={`border-grey-400 curser-pointer w-full rounded-sm border px-2 py-3 delay-100 duration-150 ease-in-out disabled:bg-slate-200 ${
                          selected ? 'border-transparent bg-blue-300' : ''
                        } ${
                          reserved ? 'border-transparent bg-red-300' : ''
                        }`}></button>
                    </>
                  )
                }}
              />
              <Button
                className="ml-auto mt-6"
                onClick={() => setIsOpenModal(true)}>
                next
              </Button>
            </>
          ) : (
            <div>loading</div>
          )}
        </>
      </Section>
    </>
  )
}
