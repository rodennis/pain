import React from 'react'
import Logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function NewSession() {

  const [sessionName, setSessionName] = useState('')
  const [date, setDate] = useState('')
  const [movement, setMovement] = useState('')
  const [weight, setweight] = useState('')
  const [rpe, setRpe] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div>
      <div className="nav">
        <div className="logo-div">
        <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      </div>
      <form>
        <input type="text" value={ sessionName } onChange={ e => {setSessionName(e.target.value)}}/>
        <hr />
        <button>+</button>
        <input type="date" value={ date } onChange={ e => setDate(e.target.value)}/>
        <div>
        <input type="text" value={ movement } onChange={ e => setMovement(e.target.value)}/>
        <input type="text" value={ weight } onChange={ e => setweight(e.target.value) }/>
        <input type="text" value={ rpe } onChange={ e => setRpe(e.target.value) }/>
        <input type="text" value={ reps } onChange={ e => setReps(e.target.value) }/>
        <input type="text" value={ sets } onChange={ e => setSets(e.target.value) }/>
          <textarea value={notes} onChange={ e => setNotes(e.target.value)} tyname="" id="" cols="30" rows="10"></textarea>
        </div>
      </form>
    </div>
  )
}

export default NewSession
