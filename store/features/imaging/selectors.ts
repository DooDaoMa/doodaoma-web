import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../..'

export const selectImaging = (state: RootState) => state.gallery

export const gallerySelector = createSelector(selectImaging, (state) => state)
