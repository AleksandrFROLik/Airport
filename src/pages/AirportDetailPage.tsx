import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../axios";
import {IAirportDetail} from "../models/models";


export const AirportDetailPage = () => {

    const [airportDetail, setAirportDetail] = useState<IAirportDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const params = useParams<'id'>()

    const fetchAirportDetail = async () => {
        setLoading(true)
        const response = await axios.get<IAirportDetail>(`airports/${params.id}`)
        setAirportDetail(response.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchAirportDetail()
    }, [])

    if (loading) return <p className='text-center text-2xl color-yellow'>Loading...</p>
    return (
        <div className='container mx-auto pt-5 max-w-[760px]'>
            <h1 className='text-center text-2xl'>{airportDetail?.name}</h1>
        </div>
    );
};

