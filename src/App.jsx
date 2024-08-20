
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Movie, {loadPopularMovies} from './components/Movie'
import Navbar from './components/Navbar'
import MainLayout from './Layout/MainLayout'
import Homepage from './Page/Homepage'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<MainLayout/>} >
        <Route index element={<Homepage />}/>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App



// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<MainLayout />} >
//       <Route index element={<HomePage />} />
//       <Route path='/movies' element={<MoviesPage/>} />
//       <Route path='/series' element={<SeriesPage />} />
//       <Route path='/AddMS' element={<AddMovies_Series/>} />
//       <Route path='/ViewMovies/:id' element={<ViewMovies/>} loader={load} /> 
//       <Route path='/ViewSeries/:id' element={<ViewSeries/>} loader ={load} />
//       <Route path='/Edit/:id' element={<Edit/>} loader={load}/>
//     </Route>
//   )
// )

//   return <RouterProvider router={router} />