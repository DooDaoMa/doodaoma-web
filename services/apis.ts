import { AccountId, LoginPayloadProps, SignUpProps } from '../types/account'

import { axiosAccountAPI, axiosAuthAPI, axiosContentAPI } from './axios'

export const performLogin = (payload: LoginPayloadProps) =>
  axiosAuthAPI.post('/login', payload)
export const performLogout = () => axiosAuthAPI.post('/logout')

export const addUser = (newUser: SignUpProps) =>
  axiosAccountAPI.post('/signup', newUser)
export const loadCurrentUser = (token: AccountId) =>
  axiosAccountAPI.get('/api/account', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const fetchAccountImages = () =>
  axiosContentAPI.get(`/api/account/images`)
