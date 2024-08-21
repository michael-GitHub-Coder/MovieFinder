
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Movie, {loadPopularMovies} from './components/Movie'
import MainLayout from './Layout/MainLayout'
import Homepage from './Page/Homepage'
import ToggleBnt from './components/ToggleBnt'
import Trailers from './components/Trailers'
import ShowMovies from './components/ShowMovies'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<MainLayout/>} >
        <Route index element={<Homepage />} loader={loadPopularMovies}/>
        <Route path='/trailers' element={<Trailers />} loader={loadPopularMovies}/>
        <Route path='/movies' element={<ShowMovies />}/>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
