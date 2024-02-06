import React from 'react'
import './Index.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowSelectPage = () => {

    const { id } = useParams()

    const [shows, setShows] = useState([]);
    const [movie, setMovie] = useState([]);


    const getShows = () => {
        axios.get(`http://127.0.0.1:8000/api/moviestheatre/${id}/`)
            .then(res => {
                setShows(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    const getMovie = () => {
        axios.get(`http://127.0.0.1:8000/api/movies/${id}/`)
            .then(res => {
                setMovie(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getShows();
        getMovie();
    }, []
    )
    return (
        <div className='container showpage'>
            <h3>Select Show</h3>
            <hr />
            <div>
                <h1 className="card-title" style={{ fontWeight: 'bold' }}>{movie.title}</h1>
                <div >
                    <p class="badge badge-info">{movie.rating}</p> <p class="badge badge-info">{movie.language}</p> <p class="badge badge-info">{movie.genre}</p> <p class="badge badge-info">{movie.duration} mins</p>
                </div>
            </div>
            <hr />
                {
                    (shows.map(theatre => (
                        <div className='card mt-3'>
                            <div className='row'>
                                <div className='card-body col-md-6'>
                                    <h5 className='card-title'>{theatre.name}</h5>
                                    <h6 className='card-subtitle mb-2 text-muted'>{theatre.city}</h6>
                                    <p className='card-text'>{theatre.address.length > 30 ? `${theatre.address.substring(0, 30)}...` : theatre.address}</p>
                                </div>
                                <div className='col-md-6 mt-4'>
                                    <a key={'11:00 AM'} href={`/seats/${movie.id}/${theatre.id}/`} className='btn btn-primary m-3'>11:00 AM</a>
                                    <a key={'03:00 PM'} href={`/seats/${movie.id}/${theatre.id}/`} className='btn btn-primary m-3'>03:00 PM</a>
                                    <a key={'07:30 PM'} href={`/seats/${movie.id}/${theatre.id}/`} className='btn btn-primary m-3'>07:30 PM</a>
                                </div>
                            </div>
                        </div>
                    )))
                }

        </div>
    )
}

export default ShowSelectPage