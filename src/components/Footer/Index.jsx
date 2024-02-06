import React from 'react'
import './Index.css'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <footer>
                <div class="footer">
                    <div class="rows">
                        <a class="icon" href="#"><FaFacebook size={30}/></a>
                        <a class="icon"  href="#"><FaInstagram size={30}/></a>
                        <a class="icon" href="#"><FaYoutube size={30}/></a>
                        <a class="icon" href="#"><FaTwitter size={30}/></a>
                    </div>

                    <div class="rows">
                        <ul>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Our Services</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>

                    <div class="rows">
                        INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh
                    </div>
                </div>
            </footer>
        </>

    )
}

export default Footer