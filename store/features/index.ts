import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { userReducer } from './user'

const combinedReducer = combineReducers({
  user: userReducer,
})

const rootReducer = createReducer(
  combinedReducer(undefined, { type: '' }),
  (builder) => {
    builder.addDefaultCase(combinedReducer)
  },
)

export default rootReducer
