import { createReducer } from '@reduxjs/toolkit'

import { FilterWheelOption } from '../../../types/imaging'

interface InitialStateProps {
  filterWheelOptions: FilterWheelOption[]
}

const initialState: InitialStateProps = {
  filterWheelOptions: [],
}

export const galleryReducer = createReducer(initialState, (builder) => {
  builder
  // .addCase(setFilterWheelOptions, (state, { payload }) => {
  //   state.filterWheelOptions = payload
  // })
})
