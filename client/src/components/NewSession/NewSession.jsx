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
  const [sessionId, setSessionId] = useState('')
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
  
  const sessionData = {
    sessionName: sessionName,
    date
  }

  const handleSessionSubmit = async (e) => {
    e.preventDefault()
    const sessionPost = await axios.post(sessionUrl, { fields: sessionData }, config)
    setSessionId(sessionPost.data.id)
    formData.forEach(async movement => {
      await axios.post(movementUrl, { fields: { ...movement, session: [sessionPost.data.id] } }, config)
    })
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
      <div className="nav">
        <div className="logo-div">
        <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      </div>
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