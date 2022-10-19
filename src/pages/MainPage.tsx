import { AirportSearch } from "../components/AirportSearch";
import { AirportFilter } from "../components/AirportFilter";
import { AirportCard } from "../components/AirportCard";
import { useEffect, useRef } from "react";
import { fetchAirports } from "../store/actions/airportAction";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ReactPaginate from 'react-paginate';

const ITEMS_PER_COUNT = 50

export const MainPage = () => {
  const page = useRef(1)
  const dispatch = useAppDispatch()
  const {error, loading, airports, count} = useAppSelector(state => state.airport)

  const pageCount = Math.ceil(count / ITEMS_PER_COUNT)

  useEffect(() => {
    dispatch(fetchAirports(page.current, ITEMS_PER_COUNT))
  }, [dispatch])

  const handlePageClick = ({selected}: { selected: number }) => {
    page.current = selected + 1
    dispatch(fetchAirports(page.current, ITEMS_PER_COUNT))
  };

  return (
    <div className='container mx-auto max-w-[760px]'>
      <AirportSearch/>
      <AirportFilter/>
      {loading && <p className='text-center text-lg'>Loading...</p>}
      {error && <p className='text-center text-lg text-red-600'>{error}</p>}
      {
        airports.map(airport => <AirportCard key={airport.id} airport={airport}/>)
      }
      {pageCount && <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={page.current - 1}
        previousLabel="<"
        containerClassName='flex'
        pageClassName='px-1 py-2 border mr-2'
        previousClassName='px-2 py-2 border'
        nextClassName='px-2 py-2 border'
        activeClassName='bg-gray-500 text-white'
      />}
    </div>
  );
};

