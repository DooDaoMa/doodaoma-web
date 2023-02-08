import {
  createAction,
  createAsyncThunk as nativeCreateAsyncThunk,
} from '@reduxjs/toolkit'

import {
  loadCurrentUser,
  performLogin,
  performLogout,
  addUser,
} from '../../../services/apis'
import { LoginPayloadProps, UserProps } from '../../../types/account'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const login = nativeCreateAsyncThunk(
  'user/login',
  async (payload: LoginPayloadProps, { dispatch, rejectWithValue }) => {
    try {
      const response = await performLogin(payload)
      const data = response?.data
      if (data) {
        dispatch(setToken(data))
        const currentUserRes = await loadCurrentUser(data)
        return currentUserRes
      }
      return response.data
    } catch (error: any) {
      const status = error?.response?.status || 400
      const data = error?.response?.data
      return rejectWithValue({ status, data })
    }
  },
)

export const logout = createAsyncThunk({
  api: performLogout,
  EVENT_NAME: 'user/logout',
})

export const fetchCurrentUser = createAsyncThunk({
  api: loadCurrentUser,
  EVENT_NAME: 'user/fetchCurrentUser',
})

export const setCurrentUser = createAction<UserProps>('user/setCurrentUser')
export const resetCurrentUser = createAction('user/resetCurrentUser')
export const createUser = createAsyncThunk({
  api: addUser,
  EVENT_NAME: 'user/signup',
})

export const setToken = createAction<string>('user/setToken')

export const restoreUser = nativeCreateAsyncThunk(
  'user/restoreUser',
  async (_, { rejectWithValue }) => {
    try {
      const tokenJson = localStorage.getItem('token')
      if (!tokenJson) return
      const token = JSON.parse(tokenJson).payload
      if (!token) return
      const currentUserRes = await loadCurrentUser(token)
      return currentUserRes
    } catch (error: any) {
      const status = error?.response?.status || 400
      const data = error?.response?.data
      return rejectWithValue({ status, data })
    }
  },
)
