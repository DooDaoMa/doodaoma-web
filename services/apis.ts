import axios from 'axios'
import qs from 'qs'

import {
  LoginPayloadProps,
  SignUpProps,
  AvailableReservationQueryParams,
  UpdateTimeSlotProps,
} from '../types'

import { axiosAccountAPI, axiosAuthAPI, axiosContentAPI } from './axios'

export const performLogin = (payload: LoginPayloadProps) =>
  axiosAuthAPI.post('/login', payload)
export const performLogout = () => axiosAuthAPI.post('/logout')

export const addUser = (newUser: SignUpProps) =>
  axiosAccountAPI.post('/signup', newUser)

export const fetchAccountImages = () => axiosContentAPI.get('/account/images')
export const loadCurrentUser = () => axiosAccountAPI.get('/api/account')

export const loadTimeSlot = (filter: AvailableReservationQueryParams) => {
  const query = qs.stringify(
    { ...filter },
    {
      addQueryPrefix: true,
      skipNulls: true,
    },
  )
  return axiosContentAPI.get(`/timeslots${query}`)
}

export const updateTimeSlot = (payload: UpdateTimeSlotProps) => {
  return axiosContentAPI.put('/timeslot', payload)
}

export const loadAvailableReservation = (
  filter: AvailableReservationQueryParams,
) => {
  const query = qs.stringify(
    { ...filter },
    {
      addQueryPrefix: true,
      skipNulls: true,
    },
  )
  return axiosContentAPI.get(`/reservations${query}`)
}

export const loadMoonPhase = () => {
  if (
    !process.env.NEXT_PUBLIC_MOON_PHASE_API_USERNAME &&
    !process.env.NEXT_PUBLIC_MOON_PHASE_API_PASSWORD
  )
    return
  const body = {
    format: 'png',
    style: {
      moonStyle: 'default',
      backgroundStyle: 'solid',
      backgroundColor: 'transparent',
      headingColor: 'transparent',
      textColor: 'black',
    },
    observer: {
      latitude: 6.56774,
      longitude: 79.88956,
      date: new Date(),
    },
    view: {
      type: 'portrait-simple',
      orientation: 'south-up',
    },
  }
  return axios.post(
    'https://api.astronomyapi.com/api/v2/studio/moon-phase',
    body,
    {
      auth: {
        username: process.env.NEXT_PUBLIC_MOON_PHASE_API_USERNAME ?? '',
        password: process.env.NEXT_PUBLIC_MOON_PHASE_API_PASSWORD ?? '',
      },
    },
  )
}

export const loadWeather = () => {
  if (!process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY) return
  const query = qs.stringify(
    {
      lat: 13.44,
      lon: 100.31,
      appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY,
    },
    {
      addQueryPrefix: true,
      skipNulls: true,
    },
  )
  return axios.get(`https://api.openweathermap.org/data/2.5/weather${query}`)
}

export const loadAPOD = () => {
  if (!process.env.NEXT_PUBLIC_NASA_API) return
  const query = qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_NASA_API,
    },
    {
      addQueryPrefix: true,
      skipNulls: true,
    },
  )
  return axios.get(`https://api.nasa.gov/planetary/apod${query}`)
}
