import { createAction } from '@reduxjs/toolkit'

import {
  loadCurrentUser,
  performLogin,
  performLogout,
  addUser,
} from '../../../services/apis'
import { UserProps } from '../../../types/account'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const login = createAsyncThunk({
  api: performLogin,
  EVENT_NAME: 'user/login',
})

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
