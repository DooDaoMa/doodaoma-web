import { createReducer } from '@reduxjs/toolkit'
import { fromUnixTime } from 'date-fns'

import {
  ErrorTypes,
  MoonPhaseData,
  APODData,
  IDSO,
  DSOResponse,
  ForecastData,
} from '../../../types'
import { groupDate } from '../../../utils/dateTime'

import {
  fetchDSOData,
  fetchFeedContent,
  fetchWeather,
  resetFeedContent,
} from './actions'

interface InitialStateProps {
  moonPhase: MoonPhaseData | null
  forecastData: ForecastData | null
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
  loadWeatherState: {
    status: string
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  moonPhase: null,
  forecastData: null,
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
  loadWeatherState: {
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
    .addCase(fetchWeather.pending, (state) => {
      state.loadWeatherState.status = 'pending'
      state.loadWeatherState.error = null
    })
    .addCase(fetchWeather.fulfilled, (state, { payload }) => {
      state.loadWeatherState.status = 'success'

      const group = groupDate(payload.list)
      console.log('group', group)
      state.forecastData = {
        sunset: fromUnixTime(payload.city.sunset),
        sunrise: fromUnixTime(payload.city.sunrise),
        weatherList: group,
      }
    })
    .addCase(fetchWeather.rejected, (state, { payload }) => {
      state.loadWeatherState.status = 'error'
      state.loadWeatherState.error = payload as ErrorTypes
    })
    .addCase(resetFeedContent, (state) => {
      state.moonPhase = null
      state.forecastData = null
    })
})
