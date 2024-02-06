import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../MovieCard/Index';
import { BiSearchAlt } from "react-icons/bi";

const MovieList = ({ filters }) => {
    const [movies, setMovies] = useState([]);
    const [paginate, setPaginate] = useState({})
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const total_page = paginate.total_page;

    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(event.target.elements.query.value);
    }

    const getMovies = () => {
        axios.get(`http://127.0.0.1:8000/api/movies/?page=${page}&query=${query}&language=${filters.language}&genre=${filters.genre}&rating=${filters.rating}`)
            .then(res => {
                setMovies(res.data.data);
                setPaginate(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getMovies();
    }, [page,query, filters]
    )
    return (
        <>
            <div className='container' onSubmit={handleSearch}>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" name="query" placeholder="Search for Movies" aria-label="Search" style={{width:'85%'}}/>
                    <button class="btn btn-success my-2 my-sm-0" type="submit"><BiSearchAlt/> Search </button>
                </form>
            </div>

            <div className='row'>
                {
                    (movies.map(movie => <Movie data={movie} />))
                }
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example" >
                    <ul class="pagination">
                        {paginate.previous ?
                            (<li class="page-item">
                                <button onClick={() => setPage(page - 1)} class="page-link">Previous</button>
                            </li>)
                            :
                            (<li class="page-item disabled">
                                <span class="page-link">Previous</span>
                            </li>)
                        }
                        {[...Array(total_page)].map((_, index) => (
                            <li key={index} className="page-item">
                                <button onClick={() => setPage((index + 1))} class="page-link">{index + 1}</button>
                            </li>
                        ))}

                        {paginate.next ?
                            (<li class="page-item">
                                <button onClick={() => setPage(page + 1)} class="page-link">Next</button>
                            </li>)
                            :
                            (<li class="page-item disabled">
                                <span class="page-link">Next</span>
                            </li>)
                        }
                    </ul>
                </nav>
            </div>
        </>


    )
}

export default MovieList