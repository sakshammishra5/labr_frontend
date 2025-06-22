import { configureStore } from '@reduxjs/toolkit'
import labourReducer from "./Slices/labour.slice"
import appReducer from "./Slices/app.slice"

export const store = configureStore({
  reducer: {
    app:appReducer,
    labour:labourReducer
  },
})