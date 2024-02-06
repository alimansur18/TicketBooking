import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from '../../components/Ticket/Index';
import './Index.css'

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [bookings, setBookings] = useState([]);

    const Logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    const getUser = () => {
        const token = localStorage.getItem('access_token')
        axios.get(`http://127.0.0.1:8000/api/user/profile/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err));
    }

    const getBooking = () => {
        const token = localStorage.getItem('access_token')
        axios.get(`http://127.0.0.1:8000/api/bookings/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                setBookings(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUser();
        getBooking();
    }, []);

    return (
        <div className="container mt-4">
            <div className='col'>
                <div className='card mb-3 mx-auto' style={{maxWidth:'540px'}}>
                    <div class="row no-gutters">
                        <div class="col-md-3 ">
                            <img className='card-img-top'
                                src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                                alt="Profile" 
                                style={{width:'8rem', height:'8rem'}}/>
                        </div>
                        <div className='col-md-6'>
                            <div className='card-body'>
                                <h5 className='card-title'>{user.name}</h5>
                                <div className="card-subtitle mb-2 text-muted">{user.email}</div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <button onClick={Logout} className='btn btn-danger mt-4'>Logout</button>
                        </div>
                    </div>
                </div>
                <div className='container tickets'>
                    <h3 className="text-center">Bookings</h3>
                    <hr />
                    <ul className="list-group list-group-flush">
                        {bookings.map(booking => (
                            <Ticket data={booking} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
