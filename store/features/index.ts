import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { galleryReducer } from './gallery'
import { userReducer } from './user'

const combinedReducer = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
})

const rootReducer = createReducer(
  combinedReducer(undefined, { type: '' }),
  (builder) => {
    builder.addDefaultCase(combinedReducer)
  },
)

export default rootReducer
