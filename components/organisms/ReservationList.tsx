import {
  format,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  addMinutes,
  setMilliseconds,
} from 'date-fns'

import { ReservationSlot } from '../molecules/ReservationSlot'

type ReservationListProps = {
  date: Date
}

export const setTime = (x: Date, h = 0, m = 0, s = 0, ms = 0): Date => {
  return setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h)
}

export const generateDateTimeSlots = (date: Date) => {
  const from = setTime(date, 0)
  const to = setTime(date, 24)
  const step = (x: Date): Date => addMinutes(x, 60)
  const today = new Date()

  const blocks = []
  let cursor = from

  while (isBefore(cursor, to)) {
    if (isBefore(today, cursor)) {
      blocks.push({
        startTime: cursor,
        endTime: step(cursor),
      })
    }
    cursor = step(cursor)
  }
  return blocks
}

type TimeSlotListProps = {
  timeSlotList: { startTime: Date; endTime: Date }[]
}

export const TimeSlotList = ({ timeSlotList }: TimeSlotListProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      {timeSlotList.map((ele, i) => (
        <ReservationSlot
          key={i}
          startTime={new Date(ele.startTime)}
          endTime={new Date(ele.endTime)}
        />
      ))}
    </div>
  )
}

export const ReservationList = ({ date }: ReservationListProps) => {
  const isToday = new Date().getDate() === date.getDate()

  const timeSlot = generateDateTimeSlots(date)

  return (
    <div className="min-w-[120px]">
      <div
        className={`sticky top-0 mb-4 flex flex-col gap-y-6 bg-white px-6 ${
          isToday ? 'border-l-[3px] border-blue-500' : ''
        }`}>
        <p className="font-bold uppercase">{format(date, 'eee')}</p>
        <p className="text-2xl font-bold">{format(date, 'd')}</p>
      </div>
      <TimeSlotList timeSlotList={timeSlot} />
    </div>
  )
}
