import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../Services/apiConfig'
 
function Session(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [sesh, setSesh] = useState({})
  const [movements, setMovements] = useState([])

  
    useEffect(() => {
      const foundSesh = props.session.find(sesh => {
        return sesh._id === params.id
      })
      setSesh(foundSesh);
      sesh ? setMovements(sesh.movements) : setMovements()
    }, [params.id, props.session, sesh])
  

  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await api.delete(`sessions/${params.id}`)
    if (res) {
      navigate('/')
      props.setToggle(prevToggle => !prevToggle)
    }
  }

  return (
    <div>
      <div className='form-div'>
        {
          sesh ?         
          <form className='session'>
            <div className='name'>
              <label>
                <input className='session-name' type="text"
                  value={sesh.sessionName} readOnly />
              </label>
            </div>
            <div className='add-a-movement'>
            </div>
            <div className='date'>
              <input className='single-date-value'
                type="date"
                value={sesh.date} readOnly />
            </div>
              <div className='sessions-div'>
                {
                  movements ?
                  movements.map(move => (
                    <div key={ move.id } className='movement'>
                      <input className='movement-name' type="text" value={move.movement} readOnly /><br />
                      <input className='weight' type="text" value={move.weight} readOnly />
                      <input className='rpe' type="text" value={move.rpe} readOnly /><br />
                      <input className='reps' type="text" value={move.reps} readOnly />
                      <input className='sets' type="text" value={move.sets} readOnly />
                      <textarea className='notes' value={move.notes} readOnly></textarea>
                    </div> 
                  )) : <h2>Loading...</h2>
                }
            </div>
            <div className="action-buttons">
            <button type='button' className='edit-session'><Link className='Link' to={`/session/edit/${sesh._id}`}>Edit</Link></button>
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
