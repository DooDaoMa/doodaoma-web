import { createReducer } from '@reduxjs/toolkit'

import {
  FilterWheelOption,
  IImagingForm,
  ImagingStatus,
} from '../../../types/imaging'

import { resetForm, setImagingStatus } from './actions'

export const imagingFormDefaultValue: IImagingForm = {
  startSequence: {
    cooling: {
      temperature: -10,
      duration: 5,
    },
  },
  imagingSequence: {
    target: {
      name: '',
      rotation: 0,
      ra: {
        hours: '0',
        minutes: '0',
        seconds: '0',
      },
      dec: {
        degrees: '0',
        minutes: '0',
        seconds: '0',
      },
    },
    tracking: {
      mode: 0,
    },
    guiding: {
      forceCalibration: false,
    },
    exposure: {
      gain: 100,
      time: 300,
      binning: '1x1',
      imageType: 'LIGHT',
    },
  },
  endSequence: {
    warming: {
      duration: 5,
    },
  },
}

interface InitialStateProps {
  filterWheelOptions: FilterWheelOption[]
  imagingFormValue: IImagingForm
  imagingStatus: ImagingStatus
}

const initialState: InitialStateProps = {
  filterWheelOptions: [],
  imagingFormValue: imagingFormDefaultValue,
  imagingStatus: 'empty',
}

export const imagingReducer = createReducer(initialState, (builder) => {
  builder.addCase(resetForm, (state) => {
    state.imagingFormValue = imagingFormDefaultValue
  })
  builder.addCase(setImagingStatus, (state, { payload }) => {
    state.imagingStatus = payload
  })
  // .addCase(setFilterWheelOptions, (state, { payload }) => {
  //   state.filterWheelOptions = payload
  // })
})
