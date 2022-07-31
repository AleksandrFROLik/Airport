import React, { useEffect, useState } from 'react';
import { useInput } from "../hooks/inputHooks";
import { useDebounce } from "../hooks/debounceHook";
import axios from "../axios";
import { IAirport, ServerResponse } from "../models/models";
import { useNavigate } from "react-router-dom";

const MIN_DELAY: number = 500

export const AirportSearch = () => {

  const [searchedAirports, setSearchedAirports] = useState<IAirport[]>([])
  const [dropDown, setDropDown] = useState(false)

  const input = useInput('')
  const debounce = useDebounce(input.value, MIN_DELAY)
  const navigate = useNavigate()

  const searchAirport = async () => {
    const response = await axios.get<ServerResponse<IAirport>>(`airports`, {
      params: {
        search: debounce,
        count: 10
      }
    })
    setSearchedAirports(response.data.results)
    console.log(response.data.results)
  }

  useEffect(() => {
    if (debounce.length >= 3) {
      searchAirport().then(() => setDropDown(true))
    } else {
      setDropDown(false)
    }
  }, [debounce])


  return (
    <div className='mb-4 relative'>
      <input type="text"
             className='border py-2  px-4 outline-0 w-full h-[42px]'
             placeholder='Type something here...'
             {...input}
      />
      {dropDown && <ul className='absolute  left-0 right-0 h-[200px]  top-[42px] shadow-md list-none bg-white '>
        {
          searchedAirports.map(searchedAirport =>
            <li key={searchedAirport.id}
                className='py-2 px-4 mb-2 hover:bg-gray-500 hover:transition-colors hover:text-white cursor-pointer '
                onClick={() => navigate(`airport/${searchedAirport.id}`)}
            >
              {searchedAirport.name}
            </li>)
        }
      </ul>}
    </div>
  );
};

