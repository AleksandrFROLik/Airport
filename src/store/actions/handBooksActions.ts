import axios from "../../axios";
import { AppDispatch } from "../index";
import { IAirportCountry, IAirportRegion, IAirportType } from "../../models/models";
import { airportSlice } from "../slices/airportSlice";
import { handBooksSlice } from "../slices/handBooksSlice";

export const fetchHandBooks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(handBooksSlice.actions.fetching())
      const response = await Promise.all([
        axios.get<IAirportType[]>('handbooks/airport-types'),
        axios.get<IAirportRegion[]>('handbooks/regions'),
        axios.get<IAirportCountry[]>('handbooks/countries')
      ])
      dispatch(handBooksSlice.actions.fetchSuccess({
        types: response[0].data,
        regions: response[1].data,
        countries: response[2].data
      }))

    } catch (e) {
      dispatch(airportSlice.actions.fetchError(e as Error))
    }
  }
}