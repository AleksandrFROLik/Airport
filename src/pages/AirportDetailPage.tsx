import React from 'react';
import {useParams} from "react-router-dom";

export const AirportDetailPage = () => {
    const params = useParams<'id'>()

    return (
        <div className='container mx-auto pt-5 max-w-[760px]'>
            Airport{params.id}
        </div>
    );
};

