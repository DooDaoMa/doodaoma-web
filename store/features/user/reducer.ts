import { createReducer } from '@reduxjs/toolkit'

import { ErrorTypes, UserProps } from '../../../types'

import {
  fetchCurrentUser,
  login,
  logout,
  resetCurrentUser,
  setCurrentUser,
  setToken,
} from './actions'

interface InitialStateProps {
  currentUser: UserProps | null
  users: Array<UserProps> | null
  token: string
  currentUserState: {
    isLoading: boolean
    error: ErrorTypes | null
  }
  usersState: {
    isLoading: boolean
    error: ErrorTypes | null
  }
  loginState: {
    status: string
    error: ErrorTypes | null
  }
  logoutState: {
    isLoading: boolean
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  currentUser: null,
  users: [],
  token: '',
  loginState: {
    status: 'idle',
    error: null,
  },
  currentUserState: {
    isLoading: false,
    error: null,
  },
  usersState: {
    isLoading: false,
    error: null,
  },
  logoutState: {
    isLoading: false,
    error: null,
  },
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loginState.status = 'loading'
      state.loginState.error = null
    })
    .addCase(login.fulfilled, (state, { payload }) => {
      state.loginState.status = 'success'
      state.currentUser = payload
      state.loginState.error = null
    })
    .addCase(login.rejected, (state, { payload }) => {
      state.loginState.status = 'error'
      state.currentUser = null
      state.loginState.error = payload as ErrorTypes
    })

    .addCase(fetchCurrentUser.pending, (state) => {
      state.currentUserState.isLoading = true
      state.currentUserState.error = null
    })
    .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      state.currentUserState.isLoading = false
      state.currentUser = payload.currentAccount
      state.currentUserState.error = null
    })
    .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
      state.currentUserState.isLoading = false
      state.currentUser = null
      state.currentUserState.error = payload as ErrorTypes
    })
    .addCase(setCurrentUser, (state, { payload }) => {
      state.currentUser = payload
    })

    .addCase(logout.pending, (state) => {
      state.logoutState.isLoading = true
      state.logoutState.error = null
    })
    .addCase(logout.fulfilled, (state) => {
      state.logoutState.isLoading = false
      state.currentUser = null
      state.logoutState.error = null
    })
    .addCase(logout.rejected, (state, { payload }) => {
      state.logoutState.isLoading = false
      state.logoutState.error = payload as ErrorTypes
    })
    .addCase(setToken, (state, { payload }) => {
      state.token = payload
    })
    .addCase(resetCurrentUser, (state) => {
      state.currentUser = null
    })
})

export default userReducer
