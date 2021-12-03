import React from 'react'

function Movement(props) {

  return (
    <div className='movement'>
              <input className='movement-name' type="text"
                value={props.movement}
                onChange={e => props.setMovement(e.target.value)}
                placeholder='Movement' /><br />
              <input className='weight' type="text"
                value={props.weight}
                onChange={e => props.setweight(e.target.value)}
                placeholder='lbs' />
              <input className='rpe' type="text"
                value={props.rpe}
                onChange={e => props.setRpe(e.target.value)}
                placeholder='RPE' /><br />
              <input className='reps' type="text"
                value={props.reps}
                onChange={e => props.setReps(e.target.value)}
                placeholder='Reps' />
              <input className='sets' type="text"
                value={props.sets}
                onChange={e => props.setSets(e.target.value)}
                placeholder='Sets' />
              <textarea className='notes'
                value={props.notes}
                onChange={e => props.setNotes(e.target.value)} tyname="" id="" cols="20" rows="8"
                placeholder='Notes'></textarea>
        </div>
  )
}

export default Movement
