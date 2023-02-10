import { createReducer } from '@reduxjs/toolkit'

import { ErrorTypes } from '../../../types'
import { ImageProps } from '../../../types/gallery'

import { fetchMyImages } from './actions'

interface InitialStateProps {
  images: ImageProps[]
  fetchMyImagesState: {
    isLoading: boolean
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  images: [],
  fetchMyImagesState: {
    isLoading: false,
    error: null,
  },
}

export const galleryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMyImages.pending, (state) => {
      state.fetchMyImagesState.isLoading = true
      state.fetchMyImagesState.error = null
    })
    .addCase(fetchMyImages.fulfilled, (state, { payload }) => {
      state.fetchMyImagesState.isLoading = false
      state.fetchMyImagesState.error = null
      state.images = payload
    })
    .addCase(fetchMyImages.rejected, (state, { payload }) => {
      state.fetchMyImagesState.isLoading = false
      state.fetchMyImagesState.error = payload as ErrorTypes
    })
})
