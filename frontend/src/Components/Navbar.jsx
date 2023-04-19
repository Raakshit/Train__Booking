import React from 'react'
import "./Navbar.css"
import {RxAvatar} from "react-icons/rx"
import Logo from "../Logo.svg"

const Navbar = () => {
  return (
    <div className='navbar'> 
      <img src={Logo} alt="" className='logo__image'/>
      <div className='navbar__user'>
        <RxAvatar className='navbar__icon'/>
        <a href="https://www.linkedin.com/in/rakshit-agarwal-348419204/">Rakshit</a>
      </div>
    </div>
  )
}

export default Navbar
