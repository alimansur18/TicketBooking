import React from 'react'
import { BiMoviePlay } from 'react-icons/bi'


const Header = () => {
  return (


      <div class="jumbotron" style={{ backgroundColor: "rgba(245, 245, 245, 0.75)" }}>
        <h1 class="display-4" style={{ color: "purple" }}><BiMoviePlay />  Boleto</h1>
        <p class="lead"> Endless Entertainment. Anywhere. Anytime. </p>
        <hr class="my-4" />
      </div>
  )
}

export default Header