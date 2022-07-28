import {IAirport, IFilter} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AirportSlice {
    loading: boolean
    error: string
    airports: IAirport[]
    airportsContainer: IAirport[]
    count: number
}

interface AirportPayload {
    airports: IAirport[]
    count: number
}


const initialState: AirportSlice = {
    loading: false,
    error: '',
    airports: [],
    airportsContainer: [],
    count: 0
}

export const airportSlice = createSlice({
    name: 'airport',
    initialState: initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSuccess(state, action: PayloadAction<AirportPayload>) {
            state.loading = false
            state.airports = action.payload.airports
            state.airportsContainer = action.payload.airports
            state.count = action.payload.count
            state.error = ''
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        },
        fetchFilterAirports(state, action: PayloadAction<IFilter>) {
            state.airports = state.airportsContainer
                .filter(airport => airport.type.includes(action.payload.type))
                .filter(airport => airport.region.includes(action.payload.region))
                .filter(airport => airport.country.includes(action.payload.country))
        }
    }
})

export default airportSlice.reducer