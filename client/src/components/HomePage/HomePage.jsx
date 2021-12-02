import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div>
      <div className="nav">
        <div className="logo-div">
        <img className='logo' src={Logo} alt="" />
        </div>
        <div className="add">
          <Link to='/new-session'><button className='add-session'>+</button></Link>
        </div>
      </div>
      <div className="action-text">
        <p>Welcome to PAIN, the workout app for you! An app for tracking your training <br/>
          sessions in the gym. We strive to make it easy and simple to track your<br/>
          training, weather you’re engaging in one workout or multiple.<br/><br/><br/><br/>
        To get started Click “<span>+</span>” and start training!</p>
      </div>
    </div>
  )
}

export default HomePage
