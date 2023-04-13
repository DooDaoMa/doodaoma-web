import {
  addMinutes,
  fromUnixTime,
  isBefore,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns'

import { WeatherData } from '../types'

export const setTime = (x: Date, h = 0, m = 0, s = 0, ms = 0): Date => {
  return setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h)
}

export const generateDateTimeSlots = (date: Date) => {
  const from = setTime(date, 0)
  const to = setTime(date, 24)
  const stepMin = 120
  const step = (x: Date): Date => addMinutes(x, stepMin)
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

export const groupDate = (dateList: any[]) => {
  return dateList.reduce((acc: Record<string, WeatherData[]>, curr) => {
    const date = fromUnixTime(curr.dt).toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push({
      main: curr.weather[0].main,
      description: curr.weather[0].description,
      icon: curr.weather[0].icon,
      id: curr.weather[0].id,
      time: fromUnixTime(curr.dt),
    })
    return acc
  }, {})
}

export const groupReserveDate = (dateList: Date[]) => {
  return dateList.reduce((acc: Record<string, Date[]>, curr) => {
    const date = curr.toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(curr)
    return acc
  }, {})
}
