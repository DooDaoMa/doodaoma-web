import {
  createAction,
  createAsyncThunk as nativeCreateAsyncThunk,
} from '@reduxjs/toolkit'

import { loadMoonPhase, loadWeather } from '../../../services/apis'

export const setMoonPhase = createAction('feed/setMoonPhase')
export const setWeather = createAction('feed/setWeather')

export const fetchFeedContent = nativeCreateAsyncThunk(
  'feed/load',
  async (_, { rejectWithValue }) => {
    try {
      const moonPhaseRes = await loadMoonPhase()
      const weatherRes = await loadWeather()

      const moonPhaseData = moonPhaseRes.data.data
      const weatherData = weatherRes.data

      return {
        moonPhase: moonPhaseData,
        weather: weatherData,
      }
    } catch (error: any) {
      const status = error?.response?.status || 404
      const data = error?.response?.data
      return rejectWithValue({ status, data })
    }
  },
)

export const resetFeedContent = createAction('feed/reset')
