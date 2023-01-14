import { AccountId, BaseUserProps, LoginPayloadProps } from '../types/account'

import { axiosAccountAPI, axiosAuthAPI } from './axios'

export const performLogin = (payload: LoginPayloadProps) =>
  axiosAuthAPI.post('/login', payload)
export const performLogout = () => axiosAuthAPI.post('/logout')

export const addUser = (newUser: BaseUserProps) =>
  axiosAccountAPI.post('/accounts', newUser)
export const loadUserById = (accountId: AccountId) =>
  axiosAccountAPI.get(`/accounts/${accountId}`)
