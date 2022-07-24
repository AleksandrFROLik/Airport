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
        <div className='container mx-auto max-w-[760px] pt-5'>
            <AirportSearch/>
            <AirportFilter/>
            <AirportCard/>
        </div>
    );
};

