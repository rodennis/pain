import React from 'react'

function Movement(props) {
  
  const {formData, handleChange, handleRemoveInput} = props

  return (
    <>
      {formData.map((input, index) => (
        <>
        <div className='movement'>
          <input className='movement-name' type="text"
              value={input.movement}
              name='movement'
            onChange={e => handleChange(e, index)}
            placeholder='Movement' /><br />
          <input className='weight' type="text"
              value={input.weight}
              name='weight'
            onChange={e => handleChange(e, index)}
            placeholder='lbs' />
          <input className='rpe' type="text"
              value={input.rpe}
              name='rpe'
            onChange={e => handleChange(e, index)}
            placeholder='RPE' /><br />
          <input className='reps' type="text"
              value={input.reps}
              name='reps'
            onChange={e => handleChange(e, index)}
            placeholder='Reps' />
          <input className='sets' type="text"
              value={input.sets}
              name='sets'
            onChange={e => handleChange(e, index)}
            placeholder='Sets' />
          <textarea className='notes'
              value={input.notes}
              name='notes'
            onChange={e => handleChange(e, index)} tyname="" id="" cols="20" rows="8"
            placeholder='Notes'/>
          </div>
          {formData.length > 1 && (
                <button onClick={() => handleRemoveInput(index)} type='button'>X</button>
              )}
          </>
      ))}
    </>
  )
}

export default Movement