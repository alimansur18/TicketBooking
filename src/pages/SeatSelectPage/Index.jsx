import React, { useState, useEffect } from 'react';
import './Index.css'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa'

const SeatSelectPage = () => {
    const { movie_id, theatre_id } = useParams()
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [booking, setBooking] = useState({})
    const navigate = useNavigate()

    // axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
    // axios.defaults.headers.post['Content-Type'] = 'application/json'

    const getSeats = () => {
        axios.get(`http://127.0.0.1:8000/api/theatreseat/${movie_id}/${theatre_id}/`)
            .then(res => {
                setSeats(res.data);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }

    const createBooking = () => {
        const data = {
            movie: parseInt(movie_id),
            theatre: parseInt(theatre_id),
            seat: selected.map(seat => seat.id),
            total_price: totalPrice
        }
        const token = localStorage.getItem('access_token')
        axios.post(`http://127.0.0.1:8000/api/booking/`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                setBooking(res.data)
                navigate(`/booking/${res.data.id}/`)
            })
            .catch(err => console.log(err));
    }

    const updateSeat = () => {
        const data = {
            seats: selected.map(seat => seat.id),
            is_reserved: true
        }
        const token = localStorage.getItem('access_token')
        axios.put(`http://127.0.0.1:8000/api/seats/`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    const handleSeatToggle = (seat) => {
        const isSeatSelected = selected.find(selected => selected && selected.id === seat.id);

        if (isSeatSelected) {
            setSelected(selected.filter(selected => selected && selected.id !== seat.id));
        } else {
            setSelected([...selected, seat]);
        }
    }

    const organizedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.category]) {
            acc[seat.category] = [[]];
        }

        const currentRow = acc[seat.category].length - 1;
        const currentRowLength = acc[seat.category][currentRow]?.length || 0;

        if (currentRowLength < 10) {
            acc[seat.category][currentRow].push(seat);
        } else {
            acc[seat.category].push([seat]);
        }
        return acc;
    }, {});


    const totalPrice = selected.reduce((total, seat) => total + seat.price, 0);


    useEffect(() => {
        getSeats();
    }, []
    )

    const bookTicket = () => {
        updateSeat()
        createBooking()
    }

    return (

        <div className="seat-container">
            <h2 >Seat Selection</h2>
            <div className="seat-container">
                {isLoading ?
                    <div class="spinner-border text-success" style={{ width: "5rem", height: "5rem" }} role="status">
                        <span class="sr-only">Loading...</span>
                    </div> :
                    <div>
                        {
                            Object.keys(organizedSeats).map((category) => (
                                <div key={category} >
                                    <h5 className="seat-category">{category}</h5>
                                    <hr />
                                    {organizedSeats[category].map((row, rowIndex) => (
                                        <div key={rowIndex} className='seat-row'>
                                            {row.map((seat) => (
                                                <button
                                                    key={seat.id}
                                                    className={`seat ${selected.find(
                                                        (selected) =>
                                                            selected && selected.id === seat.id
                                                    )
                                                        ? 'selected'
                                                        : ''
                                                        } ${seat.is_reserved ? 'reserved' : ''} `}
                                                    onClick={() => handleSeatToggle(seat)}
                                                    disabled={seat.is_reserved}
                                                >
                                                    {seat.seat_no}
                                                </button>
                                            ))}
                                            {row.length === 5 && <div className='empty-seat'></div>}
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                }
                <div className='screen'>
                    <h4>SCREEN</h4>
                </div>
            </div>

            {selected.length !== 0 ? (
                <div className='card selected-seats'>
                    <div>
                        <h5>Selected Seats</h5>
                        {selected.map((seat) => (
                            <span key={seat.id} className="badge badge-secondary mr-2">
                                {seat.seat_no}
                            </span>
                        ))}
                    </div>
                    <div>
                        <h5>Total Price : ₹{totalPrice}</h5>
                    </div>
                    <div>
                        <button
                            className="btn btn-success"
                            style={{ width: "10rem", fontWeight: "bold" }}
                            onClick={bookTicket}
                        > <FaTicketAlt size={25} />  Book Tickets </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default SeatSelectPage