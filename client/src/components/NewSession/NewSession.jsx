import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewSession.css'
import MovementTwo from '../MovementTwo'
import Movement from '../Movement/Movement'
import { sessionUrl, movementUrl, movementTwoUrl, config } from '../Services/index'
import axios from 'axios'


function NewSession(props) {

  const navigate = useNavigate()

  const [sessionName, setSessionName] = useState('')
  const [date, setDate] = useState('')
  const [movement, setMovement] = useState('')
  const [weight, setweight] = useState('')
  const [rpe, setRpe] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [notes, setNotes] = useState('')
  const [movement2, setMovement2] = useState('')
  const [weight2, setweight2] = useState('')
  const [rpe2, setRpe2] = useState('')
  const [reps2, setReps2] = useState('')
  const [sets2, setSets2] = useState('')
  const [notes2, setNotes2] = useState('')

  const sessionData = {
    sessionName: sessionName,
    date
  }
  
  const movementData = {
    movement,
    weight,
    rpe,
    reps,
    sets,
    notes
  }

  const movementTwoData = {
    movement: movement2,
    weight: weight2,
    rpe: rpe2,
    reps: reps2,
    sets: sets2,
    notes: notes2
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sessionPost = await axios.post(sessionUrl, { fields: sessionData }, config)
    await axios.post(movementUrl, { fields: {...movementData, session: [sessionPost.data.id]} }, config)
    await axios.post(movementTwoUrl, { fields: {...movementTwoData, session: [sessionPost.data.id]} }, config)
    navigate('/')
    props.setToggle(prevToggle => !prevToggle)
  }

  const handleCancel = () => {
    navigate('/')
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
        <button onClick={e => e.preventDefault()}>+</button>
          </div>
          <div className='date'>
            <input className='date-value'
              type="date" value={date}
              onChange={e => setDate(e.target.value)} />
          </div>
          <div className='sessions-div'>
          <Movement
            movement={movement} setMovement={setMovement}
            weight={weight} setweight={setweight}
            rpe={rpe} setRpe={setRpe}
            reps={reps} setReps={setReps}
            sets={sets} setSets={setSets}
            notes={notes} setNotes={setNotes}
            />
            <MovementTwo className='move2'
            movement={movement2} setMovement={setMovement2}
            weight={weight2} setweight={setweight2}
            rpe={rpe2} setRpe={setRpe2}
            reps={reps2} setReps={setReps2}
            sets={sets2} setSets={setSets2}
            notes={notes2} setNotes={setNotes2}
            />
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
