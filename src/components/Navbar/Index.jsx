import React, { useState, useEffect } from "react"
import { BiMoviePlay } from "react-icons/bi";
import "./Index.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {

  const [user, setUser] = useState({});

  const getUser = () => {
    const token = localStorage.getItem("access_token");

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontSize: '30px', color: "purple" }}>
          <BiMoviePlay size={30} />Boleto
        </Link>
        {
          user.username ?
            <Link to={"/user/profile"}>
              <button type="button" className="button"> <FaRegUser size={20} /> {user.username}  </button>
            </Link>
            :
            <Link to={"/signup"}>
              <button type="button" className="button"> Join Us </button>
            </Link>
        }

      </div>
    </nav>
  )
}
export default Navbar

