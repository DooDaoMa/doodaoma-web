import {
  addDays,
  format,
  startOfToday,
  parseJSON,
  isSameHour,
  isEqual,
} from 'date-fns'
import { useEffect, useState } from 'react'
import ScheduleSelector from 'react-schedule-selector'

import { Button, Modal, Section } from '../../components'
import { reserveTimeSlot } from '../../store/features/reservation'
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
    setSchedule(newSchedule)
  }

  // const getFormatSelectedTime = () => {
  //   const timeFormat = 'dd eee kk:mm'
  //   return `${format(schedule.at(0) || new Date(), timeFormat)} - ${format(
  //     schedule.at(schedule.length - 1) || new Date(),
  //     timeFormat,
  //   )}`
  // }

  const onConfirm = () => {
    const timeSlotIdList = schedule?.map((selectedSlot) => {
      const slot = timeSlotList?.find((timeSlot) => {
        return isEqual(selectedSlot, parseJSON(timeSlot.startTime))
      })
      if (slot) {
        return slot._id
      }
    })
    dispatch(
      reserveTimeSlot({
        updatedList: timeSlotIdList,
        status: 'reserved',
        username: currentUser?.username,
      }),
    )

    setIsOpenModal(false)
  }

  // fetch time slot list
  useEffect(() => {
    dispatch(
      fetchTimeSlot({
        startTime: startOfToday(),
        endTime: addDays(startOfToday(), 7),
      }),
    )
  }, [])

  // set reserved time slot list
  useEffect(() => {
    if (timeSlotList && timeSlotList?.length > 0) {
      setReservedList([
        ...timeSlotList
          .filter((timeSlot) => timeSlot.status !== 'available')
          .map((timeSlot) => parseJSON(timeSlot.startTime)),
      ])
    }
    // timeSlotList?.forEach((ele) => {
    //   console.log(format(parseJSON(ele.startTime), 'dd eee kk:mm'), ele.startTime)
    // })
  }, [timeSlotList])

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        handleIsOpen={setIsOpenModal}
        title="Confirm your reservation"
        isPrimaryBtnDisabled={schedule.length < 1}
        handleSubmit={() => onConfirm()}>
        <h3 className="mb-2 text-xl font-semibold">Selected Time Slots:</h3>
        {schedule.map((timeSlot, i) => (
          <div key={i}>{format(timeSlot, 'dd eee h aaaa')}</div>
        ))}
        <p>total: {schedule.length} hour(s)</p>
      </Modal>
      <Section>
        <h1 className="section-title">Book the Telescope</h1>
        <p className="mb-8 text-lg">
          Select available date and time for reservation
        </p>
        {loadTimeSlotState.status === 'success' ? (
          <>
            <ScheduleSelector
              selection={schedule}
              minTime={18}
              maxTime={31}
              selectionScheme="linear"
              onChange={handleChange}
              columnGap="1.25rem"
              rowGap="1.25rem"
              dateFormat="D ddd"
              timeFormat="h aa"
              startDate={startOfToday()}
              renderDateCell={(dateTime, selected) => {
                const reserved = reservedList?.find((timeSlot) =>
                  isSameHour(timeSlot, dateTime),
                )
                return (
                  <>
                    <button
                      className={`border-grey-400 curser-pointer w-full rounded-sm border px-2 py-3 delay-100 duration-150 ease-in-out disabled:bg-slate-200 ${
                        selected ? 'border-transparent bg-blue-300' : ''
                      }`}
                      disabled={!!reserved}></button>
                  </>
                )
              }}
              renderTimeLabel={(dateTime) => (
                <div className="my-auto">{format(dateTime, 'h aaaa')}</div>
              )}
            />
            <Button
              className="ml-auto mt-6"
              disabled={schedule.length < 1}
              onClick={() => setIsOpenModal(true)}>
              next
            </Button>
          </>
        ) : (
          <div>loading...</div>
        )}
      </Section>
    </>
  )
}

ReservationPage.requireAuth = true
