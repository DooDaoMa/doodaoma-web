import { createAction } from '@reduxjs/toolkit'

import { ImagingStatus } from '../../../types/imaging'

export const setFilterWheelOptions = createAction(
  'imaging/setFilterWheelOptions',
)

export const resetForm = createAction('imaging/resetForm')

export const setImagingStatus = createAction<ImagingStatus>(
  'imaging/setImagingStatus',
)
