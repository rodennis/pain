import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import './HomePage.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function HomePage() {
  return (
    <div>
      <div className="nav">
        <div className="logo-div">
        <img className='logo' src={Logo} alt="" />
        </div>
        <div className="add">
          <Link to='/new-session'>
          <Fab className='circle' aria-label="add">
        <AddIcon />
      </Fab>
      </Link>
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
