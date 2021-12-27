import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './NewSession.css'
import Movement from '../Movement/Movement'
import api from '../Services/apiConfig'


function NewSession(props) {

  const {session, setToggle} = props
  const params = useParams()
  const navigate = useNavigate()
  const [sessionName, setSessionName] = useState('')
  const [date, setDate] = useState('')  
  const [movementArray, setMovementArray] = useState([])
  const [formData, setFormData] = useState([
    {
      movement: '',
      weight: '',
      rpe: '',
      reps: '',
      sets: '',
      notes: '',
    }
  ])
  
  useEffect(() => {
    if (session) {
      const foundSesh = session.find(sesh => {
        return sesh._id === params.id
      })
      if (foundSesh) {
        setSessionName(foundSesh.sessionName)
        setDate(foundSesh.date)
        setMovementArray(foundSesh.movements)
        let movements = movementArray.map(move => move)
        setFormData(movements)
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, session, movementArray])

  const handleSessionSubmit = async (e) => {
    e.preventDefault()
    const movements = formData.map(movement => movement)
    const sessionData = {
      sessionName,
      date,
      movements
    }
    if (session) {
      await api.delete(`sessions/${params.id}`)
      await api.post('/sessions', sessionData)
      setToggle(prevToggle => !prevToggle)
      navigate('/')
    } else {
      await api.post('/sessions', sessionData)
      setToggle(prevToggle => !prevToggle)
      navigate('/')
    }  
  }

  const handleCancel = () => {
    navigate('/')
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const form = [...formData];
    form[index][name] = value;
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
        notes: ''
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