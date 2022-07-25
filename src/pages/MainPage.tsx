import {AirportSearch} from "../components/AirportSearch";
import {AirportFilter} from "../components/AirportFilter";
import {AirportCard} from "../components/AirportCard";
import {useEffect} from "react";
import {fetchAirports} from "../store/actions/airportAction";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

export const MainPage = () => {

    const dispatch = useAppDispatch()
    const {error, loading, airports} = useAppSelector(state => state.airport)

    useEffect(()=>{
        dispatch(fetchAirports())
    },[])

    return (
        <div className='container mx-auto max-w-[760px]'>
            <AirportSearch/>
            <AirportFilter/>
            {loading && <p className='text-center text-lg'>Loading...</p>}
            {error && <p className='text-center text-lg text-red-600'>{error}</p>}
            {
                airports.map(airport =>  <AirportCard key={airport.id} airport={airport}/> )
            }

        </div>
    );
};

