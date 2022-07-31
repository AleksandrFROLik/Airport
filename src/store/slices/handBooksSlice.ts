import { IAirportCountry, IAirportRegion, IAirportType} from "../../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface HandBooksSlice {
  loading: boolean
  error: string
  types: IAirportType[]
  regions: IAirportRegion[]
  countries: IAirportCountry[]
}

const initialState: HandBooksSlice = {
  loading: false,
  error: '',
  types: [],
  regions: [],
  countries: []
}

interface HandBooksPayload {
  types: IAirportType[]
  regions: IAirportRegion[]
  countries: IAirportCountry[]
}

export const handBooksSlice = createSlice({
  name: 'handBooks',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<HandBooksPayload>) {
      state.loading = false
      state.error = ''
      state.types = action.payload.types
      state.regions = action.payload.regions
      state.countries = action.payload.countries
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
  }
})

export default handBooksSlice.reducer