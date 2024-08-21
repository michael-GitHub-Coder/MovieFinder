import React from 'react'
import Movie from '../components/Movie'
import Series from '../components/Series'
import ShowInfo from '../components/ShowInfo'

const Homepage = () => {
  return (
    <>
      <Movie />
      <Series />
      <ShowInfo />
    </>
  )
}

export default Homepage