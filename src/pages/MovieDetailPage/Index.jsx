import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const MovieDetailPage = () => {
  const { id } = useParams()

  const [movie, setMovie] = useState({})

  const fetchData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/movies/' + id + '/');
    setMovie(res.data);
  }

  const navigate = useNavigate()

  const handleBookTicket = () => {navigate(`/movieshows/${movie.id}`)}

  useEffect(() => {
    fetchData()
  }, [])

  return (

    <>
      <div className="container jumbotron" style={{ marginTop: '1rem', padding: '1rem' }}>
        <div className="wrapper">
          {movie && (
            <div className="row">
              <div className="col-md-5" align='center'>
                <img src={movie.image} alt="" className='img-fluid' style={{ maxHeight: '30rem', maxWidth: '28rem' }} />
              </div>
              <div className="col-md-7">
                <h1 className="card-title" style={{ fontWeight:'bold', textDecoration:'underline 1px' }}>{movie.title}</h1>
                <div >
                  <p className='text-secondary '>• {movie.duration} mins • {movie.language} •</p>
                </div>
                <div>
                  <span className='font-weight-bold'>About the movie</span>
                  <p>{movie.description}</p>
                </div>
                <h5 className='text-secondary'><span className="small">Director : </span>{movie.director}</h5>
              <div>
                <h5>
                  <p class="badge badge-secondary">{movie.rating}</p> <p class="badge badge-secondary">{movie.language}</p>
                </h5>
                <button onClick={handleBookTicket} type="button" class="btn btn-success btn-lg" style={{ width: '18rem' }}>Book Ticket</button>
              </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MovieDetailPage