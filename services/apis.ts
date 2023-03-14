import qs from 'qs'

import {
  AccountId,
  LoginPayloadProps,
  SignUpProps,
  AvailableReservationQueryParams,
} from '../types'

import { axiosAccountAPI, axiosAuthAPI, axiosContentAPI } from './axios'

export const performLogin = (payload: LoginPayloadProps) =>
  axiosAuthAPI.post('/login', payload)
export const performLogout = () => axiosAuthAPI.post('/logout')

export const addUser = (newUser: SignUpProps) =>
  axiosAccountAPI.post('/signup', newUser)
export const loadCurrentUser = (token: AccountId) =>
  axiosAccountAPI.get('api/account', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

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
