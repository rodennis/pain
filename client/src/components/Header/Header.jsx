import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <div className="nav">
        <div className="logo-div">
          <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Header
