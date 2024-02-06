import React from 'react'
import Header from '../../components/Header/Index'
import MovieList from '../../components/Movielist/Index'
import FilterComponent from '../../components/Filter/Index'
import { useState } from 'react'

const Homepage = () => {

  const [filters, setFilters] = useState({
    language: '',
    genre: '',
    rating: '',
  })

  const applyFilters = (language, genre, rating) => {
    setFilters({
      language,
      genre,
      rating,
    });
  }
    return (
    <>
      <Header />
        <div className="row">
          <div className="col-md-3">
            <FilterComponent applyFilters={applyFilters}/>
          </div>
          <div className="col-md-9">
            <MovieList filters={filters} />
          </div>
        </div>
    </>
  )
}

export default Homepage