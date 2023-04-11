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
        username:
          process.env.MOON_PHASE_API_USERNAME ||
          '0cf6db1e-c2c0-40be-b4b7-8046e0039ead',
        password:
          process.env.MOON_PHASE_API_PASSWORD ||
          '4f53efbfac92f10569de540bdbcb5773eeb1a041e176aea0573b5b61c64b9614e8fd5c89414496ebb3e81706092f09f7eba389e4dfaab953ffc32593219235cb2ef57ca0d31dca2519094b60f848ec992181b32724ef32410a38067d07681f977d1f0dd296ef81fa5f0a2eb02bca8965',
      },
    },
  )
}

export const loadWeather = () => {
  const query = qs.stringify(
    {
      lat: 13.44,
      lon: 100.31,
      appid: '21ce03715d96d6330b1d0e3269e6478a',
    },
    {
      addQueryPrefix: true,
      skipNulls: true,
    },
  )
  return axios.get(`https://api.openweathermap.org/data/2.5/weather${query}`)
}

export const loadAPOD = () => {
  const query = qs.stringify(
    {
      api_key: 'lKm3M2eiPgSNSzoaqheUCFo2PLnwlpxvxCPW1lt3',
    },
    {
      addQueryPrefix: true,
      skipNulls: true,
    },
  )
  return axios.get(`https://api.nasa.gov/planetary/apod${query}`)
}
