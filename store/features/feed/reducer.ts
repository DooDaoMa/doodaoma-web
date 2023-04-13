import { createReducer } from '@reduxjs/toolkit'
import { fromUnixTime } from 'date-fns'

import {
  ErrorTypes,
  MoonPhaseData,
  WeatherData,
  APODData,
  IDSO,
  DSOResponse,
} from '../../../types'

import { fetchDSOData, fetchFeedContent, resetFeedContent } from './actions'

interface InitialStateProps {
  moonPhase: MoonPhaseData | null
  weather: WeatherData | null
  apod: APODData | null
  dsoList: IDSO[] | null
  loadContentState: {
    status: string
    error: ErrorTypes | null
  }
  loadDSOListState: {
    status: string
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  moonPhase: null,
  weather: null,
  apod: null,
  dsoList: null,
  loadContentState: {
    status: 'idle',
    error: null,
  },
  loadDSOListState: {
    status: 'idle',
    error: null,
  },
}

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchFeedContent.pending, (state) => {
      state.loadContentState.status = 'loading'
      state.loadContentState.error = null
    })
    .addCase(fetchFeedContent.fulfilled, (state, { payload }) => {
      state.loadContentState.status = 'success'
      state.moonPhase = payload.moonPhase
      state.weather = {
        sunset: fromUnixTime(payload.weather.sys.sunset),
        sunrise: fromUnixTime(payload.weather.sys.sunrise),
        main: payload.weather.weather[0].main,
        description: payload.weather.weather[0].description,
        icon: payload.weather.weather[0].icon,
        id: payload.weather.weather[0].id,
      }
      state.apod = payload.apod
    })
    .addCase(fetchFeedContent.rejected, (state, { payload }) => {
      state.loadContentState.status = 'error'
      state.loadContentState.error = payload as ErrorTypes
    })
    .addCase(fetchDSOData.pending, (state) => {
      state.loadDSOListState.status = 'pending'
      state.loadDSOListState.error = null
    })
    .addCase(fetchDSOData.fulfilled, (state, { payload }) => {
      state.dsoList = payload?.records?.map((record: DSOResponse) => ({
        ra: record?.fields?.ra,
        dec: record?.fields?.dec,
        id: record?.fields?.id1,
        name: record?.fields?.name,
        cat1: record?.fields?.cat1,
      }))
      state.loadDSOListState.status = 'success'
    })
    .addCase(fetchDSOData.rejected, (state, { payload }) => {
      state.loadDSOListState.status = 'error'
      state.loadDSOListState.error = payload as ErrorTypes
    })
    .addCase(resetFeedContent, (state) => {
      state.moonPhase = null
      state.weather = null
    })
})
