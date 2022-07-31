import { combineReducers, configureStore } from "@reduxjs/toolkit";
import airportReducer from './slices/airportSlice'
import handBooksReducer from './slices/handBooksSlice'
import authReducer from './slices/authSlice'

const rootReducer = combineReducers({
  airport: airportReducer,
  handBooks: handBooksReducer,
  auth: authReducer
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export const store = setupStore()
export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatch = AppStoreType['dispatch']