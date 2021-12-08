import React from 'react'
import Logo from '../photos/logo.png'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sessionUrl, config } from '../Services/index'
import axios from 'axios'

 
function Session(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [sesh, setSesh] = useState([])
  const [movements, setMovements] = useState([])

  
    useEffect(() => {
      const foundSesh = props.session.find(sesh => {
        return sesh.id === params.id
      })
      setSesh(foundSesh);

      const moves = props.movements.filter((movement) => {
        if (movement.fields.session) {
          return movement.fields?.session[0] === foundSesh?.id
        } else {
          return false
        }
      })
      setMovements(moves)
    }, [params.id, props.session, props.movements])
  

  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await axios.delete(`${sessionUrl}/${params.id}`, config)
    if (res) {
      navigate('/')
      props.setToggle(prevToggle => !prevToggle)
    }
  }

  return (
    <div>
      <div className='form-div'>
        {
          sesh && sesh.fields ?         
          <form className='session'>
            <div className='name'>
              <label>
                <input className='session-name' type="text"
                  value={sesh.fields.sessionName} readOnly />
              </label>
            </div>
            <div className='add-a-movement'>
            </div>
            <div className='date'>
              <input className='single-date-value'
                type="date"
                value={sesh.fields.date} readOnly />
            </div>
              <div className='sessions-div'>
              {
                  movements.map(move => (
                    <div key={ move.id } className='movement'>
                      <input className='movement-name' type="text" value={move.fields.movement} readOnly /><br />
                      <input className='weight' type="text" value={move.fields.weight} readOnly />
                      <input className='rpe' type="text" value={move.fields.rpe} readOnly /><br />
                      <input className='reps' type="text" value={move.fields.reps} readOnly />
                      <input className='sets' type="text" value={move.fields.sets} readOnly />
                      <textarea className='notes' value={move.fields.notes} readOnly></textarea>
                    </div> 
                  )) 
                }
            </div>
            <div className="action-buttons">
            <Link to={`/session/edit/${sesh.id}`}><button className='send-session'>Edit</button></Link>
              <button onClick={handleDelete} className='cancel-session'>Delete</button>
            </div>
          </form>
          : <h1>Loading...</h1>
        }
      </div>
    </div>
  )
}

export default Session
