import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewSession.css'
import Movement from '../Movement/Movement'
import { sessionUrl, movementUrl, config } from '../Services/index'
import axios from 'axios'

function NewSession(props) {

  const navigate = useNavigate()
  const [sessionName, setSessionName] = useState('')
  const [date, setDate] = useState('')
  const [components, setComponents] = useState([<Movement />])

  const sessionData = {
    sessionName: sessionName,
    date
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sessionPost = await axios.post(sessionUrl, { fields: sessionData }, config)
    // await axios.post(movementUrl, { fields: {...movementData, session: [sessionPost.data.id]} }, config)
    navigate('/')
    props.setToggle(prevToggle => !prevToggle)
  }
  
  const handleCancel = () => {
    navigate('/')
  }
  
  const handleAdd = (e) => {
    e.preventDefault()
    setComponents([...components, <Movement />])
  }

  return (
    <div className='container'>
      <div className="nav">
        <div className="logo-div">
        <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      </div>
      <div className='form-div'>
        <form className='session' onSubmit={ handleSubmit }>
          <div className='name'>
              <input className='session-name' type="text"
                value={sessionName}
                onChange={e => { setSessionName(e.target.value) }}
                placeholder='Session Name' />
          </div>
          <div className='add-a-movement'>
        <button onClick={ handleAdd }>+</button>
          </div>
          <div className='date'>
            <input className='date-value'
              type="date" value={date}
              onChange={e => setDate(e.target.value)} />
          </div>
          <div className='sessions-div'>
            {
              components.map(comp => comp)
            }
            </div>
          <div className="action-buttons">
            <button className='send-session'>Add</button>
            <button onClick={ handleCancel } className='cancel-session'>Cancel</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default NewSession
