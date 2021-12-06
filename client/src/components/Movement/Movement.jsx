import React from 'react'
import { useState } from 'react'
import { movementUrl, config } from '../Services/index'
import axios from 'axios'

function Movement(props) {

  const [movement, setMovement] = useState('')
  const [weight, setweight] = useState('')
  const [rpe, setRpe] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [notes, setNotes] = useState('')

  const movementData = {
    movement,
    weight,
    rpe,
    reps,
    sets,
    notes
  }

  const moveMentPost = async () => {
    await axios.post(movementUrl, { fields: {...movementData, session: [sessionPost.data.id]} }, config)
    
  } 

  return (
    <div className='movement'>
              <input className='movement-name' type="text"
                value={movement}
                onChange={e => setMovement(e.target.value)}
                placeholder='Movement' /><br />
              <input className='weight' type="text"
                value={weight}
                onChange={e => setweight(e.target.value)}
                placeholder='lbs' />
              <input className='rpe' type="text"
                value={rpe}
                onChange={e => setRpe(e.target.value)}
                placeholder='RPE' /><br />
              <input className='reps' type="text"
                value={reps}
                onChange={e => setReps(e.target.value)}
                placeholder='Reps' />
              <input className='sets' type="text"
                value={sets}
                onChange={e => setSets(e.target.value)}
                placeholder='Sets' />
              <textarea className='notes'
                value={notes}
                onChange={e => setNotes(e.target.value)} tyname="" id="" cols="20" rows="8"
                placeholder='Notes'></textarea>
        </div>
  )
}

export default Movement
