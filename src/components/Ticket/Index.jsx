import React from "react";
import { Link } from "react-router-dom"
import { MdOutlineChair } from "react-icons/md";
import './Index.css'


const Ticket = (props) => {

    const { id, movie, theatre, seat, total_price } = props.data;

    return (
        <div className="card mb-3" style={{ maxWidth: '800px', margin: "1rem", boxShadow: "2px 2px 3px 1px rgba(0, 0, 0, 0.24)" }}>
            <div className="row no-gutters">
                <div className="col-md-4" style={{ borderRight: '1px dashed Silver' }}>
                    <img src={movie.image} alt="..." style={{ width: "12.5rem", margin: "1rem 2rem" }} />
                </div>
                <div className="col-md-6" style={{ borderRight: '1px dashed Silver' }}>
                    <div className="card-body">
                        <h4 className="card-title mb-0">{movie.title}</h4>
                        <p className="card-text mb-2"><small className="text-muted">{movie.language}</small></p>
                        <p className="card-text mb-2">{theatre.name}</p>
                        <p className="card-text mb-0"><small>Quantity : {seat.length}</small></p>
                        <p className="card-text mb-2"><MdOutlineChair /> <strong>{seat[0].category} - {seat.map(seat => seat.seat_no + ",")}</strong> </p>
                        <div>
                            <table className="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                        <td>Ticket Price</td>
                                        <td>₹ {total_price}</td>
                                    </tr>
                                    <tr>
                                        <td>Fees + Taxes</td>
                                        <td>₹ {(total_price) * 0.05}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Total Price</td>
                                        <td classNameName="font-weight-bold">₹ {total_price + (total_price) * 0.05}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <img src="https://th.bing.com/th/id/OIP.AMT9G_EZFITvQRgHS5o2TAAAAA?rs=1&pid=ImgDetMain" alt="baarcode"
                        style={{ width: "6.5rem", margin: "1rem 1rem" }} className="barcode" />
                    <hr />
                    <div className="text-center">
                        <p className="text-muted">booking ID</p>
                        <strong>{id}</strong>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Ticket;
