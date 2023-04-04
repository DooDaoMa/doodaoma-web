import { createReducer } from '@reduxjs/toolkit'
import { fromUnixTime } from 'date-fns'

import { ErrorTypes, MoonPhaseData, WeatherData } from '../../../types'

import { fetchFeedContent, resetFeedContent } from './actions'

interface InitialStateProps {
  moonPhase: MoonPhaseData | null
  weather: WeatherData | null
  loadContentState: {
    status: string
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  moonPhase: null,
  weather: null,
  loadContentState: {
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
    })
    .addCase(fetchFeedContent.rejected, (state, { payload }) => {
      state.loadContentState.status = 'error'
      state.loadContentState.error = payload as ErrorTypes
    })
    .addCase(resetFeedContent, (state) => {
      state.moonPhase = null
      state.weather = null
    })
})
