
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider 
  } from 'react-router-dom'
import './App.css'
import  {loadPopularMovies} from './components/Movie'
import MainLayout from './Layout/MainLayout'
import Homepage from './Page/Homepage'
import Trailers from './components/Trailers'
import ShowMovies from './components/ShowMovies'
import ShowSeries from './components/ShowSeries'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<MainLayout/>} >
        <Route index element={<Homepage />} loader={loadPopularMovies}/>
        <Route path='/trailers' element={<Trailers />} loader={loadPopularMovies}/>
        <Route path='/movies' element={<ShowMovies />}/>
        <Route path='/series' element={<ShowSeries/>} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
