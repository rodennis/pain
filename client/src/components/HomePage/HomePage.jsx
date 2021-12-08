import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import seshLogo from '../photos/seshLogo.png'
import './HomePage.css'

function HomePage(props) {
  return (
    <div>
      <div className="nav">
        <div className="add">
          <Link to='/new-session'>
          <Fab className='circle' aria-label="add">
        <AddIcon />
      </Fab>
      </Link>
        </div>
      </div>
      <div className='all-sessions-div'>
        {
          props.session[0]
          ?
          props.session.map(sesh => (
            <Link key={ sesh.id} className='link' to={`/session/${sesh.id}`}>
              <div className='sesh-div'>
          <h1 className='sesh-name'>{sesh.fields.sessionName}</h1>
                <h4 className='sesh-date'>{sesh.fields.date ? sesh.fields.date : <p>No Date Provided</p>}</h4>
            <img className='sesh-logo' src={seshLogo} alt="logo" />
          </div>
            </Link>
      ))
      :
      <div className="action-text">
          <p>Welcome to PAIN, the workout app for you! An app for tracking your training <br />
            sessions in the gym. We strive to make it easy and simple to track your<br />
            training, weather you’re engaging in one workout or multiple.<br /><br /><br /><br />
            To get started Click “<span>+</span>” and start training!</p>
        </div>
      }
      </div>

    </div>
  )
}

export default HomePage
