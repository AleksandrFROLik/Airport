import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ChangeEvent, useEffect, useState } from "react";
import { IFilter } from "../models/models";
import { airportSlice } from "../store/slices/airportSlice";

export const AirportFilter = () => {
  const dispatch = useAppDispatch()
  const {types, regions, countries, loading, error} = useAppSelector(state => state.handBooks)
  const [filter, setFilter] = useState<IFilter>({
    type: '',
    region: '',
    country: ''
  })
  const [hasFilter, setHasFilter] = useState(false)
  const isFilterEnabled = () => {
    return filter.type || filter.region || filter.country
  }

  useEffect(() => {
    if (isFilterEnabled()) {
      setHasFilter(true)
    } else {
      setHasFilter(false)
    }

    dispatch(airportSlice.actions.fetchFilterAirports(filter))
  }, [filter])

  if (loading) return <p className='text-center'>Loading...</p>

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
  };

  const clearFilter = () => {
    setFilter({type: '', region: '', country: ''})
  };

  return (
    <div className='border px-4 py-2 mb-2 '>
      <span className='font-bold mr-2'>Filter</span>

      <select name="type"
              className='mr-2 border py-1 px-2'
              onChange={handleOnChange}
              value={filter.type}
      >
        <option value="" disabled>Type</option>
        {types.map(type => <option key={type}>{type}</option>)}
      </select>
      <select name="region"
              className='mr-2 border py-1 px-2'
              onChange={handleOnChange}
              value={filter.region}
      >
        <option value="" disabled>Region</option>
        {regions.map(region => <option key={region}>{region}</option>)}
      </select>
      <select name="country"
              className='mr-2 border py-1 px-2'
              onChange={handleOnChange}
              value={filter.country}
      >
        <option value="" disabled>Country</option>
        {countries.map(country => <option key={country}>{country}</option>)}
      </select>
      {hasFilter &&
      <button
          className='py-1 px-4 bg-red-700 text-white rounded'
          onClick={clearFilter}>&times;
      </button>}

    </div>
  );
};

