import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewSession.css'
import Movement from '../Movement/Movement'
import { movementUrl, config } from '../Services/index'
import axios from 'axios'


function NewSession() {

  const navigate = useNavigate()

  const [sessionName, setSessionName] = useState('')
  const [date, setDate] = useState('')
  const [movement, setMovement] = useState('')
  const [weight, setweight] = useState('')
  const [rpe, setRpe] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [notes, setNotes] = useState('')

  const sessionData = {
    name: sessionName,
    movement,
    weight,
    rpe,
    reps,
    sets,
    notes
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const sessionPost = () => {
      axios.post(movementUrl, { fields: sessionData }, config).then((res, err) => {
        if (res) {
          navigate('/')
        } else {
          console.log('something went wrong');
        }
      })
    }
    sessionPost()
    
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div>
      <div className="nav">
        <div className="logo-div">
        <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      </div>
      <div className='form-div'>
        <form className='session' onSubmit={ handleSubmit }>
          <div className='name'>
        <input className='session-name' type="text" value={ sessionName } onChange={ e => {setSessionName(e.target.value)}} placeholder='Session Name'/>
          </div>
          <div className='add-a-movement'>
        <button>+</button>
          </div>
          <div className='date'>
        <input className='date-value' type="date" value={ date } onChange={ e => setDate(e.target.value)}/>
          </div>
          <Movement
            movement={movement} setMovement={setMovement}
            weight={weight} setweight={setweight}
            rpe={rpe} setRpe={setRpe}
            reps={reps} setReps={setReps}
            sets={sets} setSets={setSets}
            notes={notes} setNotes={setNotes}
          />
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