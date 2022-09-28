import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import gratitudeReducer from '../features/gratitudes/gratitudeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gratitudes: gratitudeReducer,
  },
})
