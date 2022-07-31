import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AuthPage } from "./pages/AuthPage";
import { AirportDetailPage } from "./pages/AirportDetailPage";
import { Navigation } from "./components/Navigation"
import { useEffect } from "react";
import { fetchHandBooks } from "./store/actions/handBooksActions";
import { useAppDispatch } from "./hooks/redux";

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchHandBooks())
  }, [dispatch])

  return (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/airport/:id' element={<AirportDetailPage/>}/>
      </Routes>
    </>
  )
};


