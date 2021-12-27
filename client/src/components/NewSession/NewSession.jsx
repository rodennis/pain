import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './NewSession.css'
import Movement from '../Movement/Movement'
import api from '../Services/apiConfig'


function NewSession(props) {

  const params = useParams()
  const navigate = useNavigate()
  const [sessionName, setSessionName] = useState('')
  const [date, setDate] = useState('')  
  const [sessionId] = useState('')
  const [movementArray, setMovementArray] = useState([])
  const [formData, setFormData] = useState([
    {
      movement: '',
      weight: '',
      rpe: '',
      reps: '',
      sets: '',
      notes: '',
      session: [
        ""
      ]
    }
  ])
  
  useEffect(() => {
    if (props.session) {
      const foundSesh = props.session.find(sesh => {
        return sesh.id === params.id
      })
      if (foundSesh) {
        setSessionName(foundSesh.fields.sessionName)
        setDate(foundSesh.fields.date)
      }
    }
    if (props.movements) {
      const moves = props.movements.filter( movement => {
        if (movement.fields.session) {
          return movement.fields?.session[0] === params.id
        }
        return this
      })
      setMovementArray(moves)
      movementArray.map(move => (
        setFormData([...formData,
          {
            movement: move.fields.movement,
            weight: move.fields.weight,
            rpe: move.fields.rpe,
            reps: move.fields.reps,
            sets: move.fields.sets,
            notes: move.fields.notes,
          }
        ])
      ))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, props.session, props.movements])

  const handleSessionSubmit = async (e) => {
    e.preventDefault()
    const movements = formData.map(movement => movement)
    const sessionData = {
      sessionName,
      date,
      movements
    }
    await api.post('/sessions', sessionData )    
    props.setToggle(prevToggle => !prevToggle)
      navigate('/')
  }

  const handleCancel = () => {
    navigate('/')
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const form = [...formData];
    form[index][name] = value;
    form[index].session[0] = sessionId;
    setFormData(form);
  };

  const handleAddInput = () => {
    setFormData([...formData,
      {
        movement: '',
        weight: '',
        rpe: '',
        reps: '',
        sets: '',
        notes: '',
        session: [
          ''
        ]
      }
    ]);
  };

  const handleRemoveInput = (index) => {
    const form = [...formData];
    form.splice(index, 1);
    setFormData(form);
  };

  return (
    <div className='container'>
      <div className='form-div'>
        <form className='session' onSubmit={ handleSessionSubmit }>
          <div className='name'>
              <input className='session-name' type="text"
                value={sessionName}
                onChange={e => { setSessionName(e.target.value) }}
                placeholder='Session Name' required/>
          </div>
          <div className='add-a-movement'>
            <button onClick={ handleAddInput } type='button'>+</button>
          </div>
          <div className='date'>
            <input className='date-value'
              type="date" value={date}
              onChange={e => setDate(e.target.value)} />
          </div>
          <div className='sessions-div'>
            {
              <Movement
                formData={formData}
                handleChange={handleChange}
                handleRemoveInput={handleRemoveInput}
              />
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