import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineChair } from "react-icons/md";
import "./Index.css";
import axios from "axios";
import Ticket from "../../components/Ticket/Index";

function BookingPage() {
    const { id } = useParams();

    const [booking, setBooking] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getBooking = () => {
        axios.get(`http://127.0.0.1:8000/api/booking/${id}/`)
            .then(res => {
                setBooking(res.data);
                setIsLoading(false);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getBooking();
    }, [])

    return (
        <>
            <h1>booking</h1>
            {isLoading ?
                <div class="spinner-border text-success" style={{ width: "5rem", height: "5rem" }} role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                :
                (<Ticket data={booking}/>)
                }
        </>
    )
}

export default BookingPage;