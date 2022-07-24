import {combineReducers, configureStore} from "@reduxjs/toolkit";
import airportReducer from './slices/AirportSlice'

const rootReducer = combineReducers({
    airport: airportReducer
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