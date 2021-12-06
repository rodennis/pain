import React from 'react'
import Logo from '../photos/logo.png'
import Movement from '../Movement/Movement'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { sessionUrl, config } from '../Services/index'
import axios from 'axios'

 
function Session(props) {

  const firstUpdate = useRef(true)
  const navigate = useNavigate()
  const params = useParams()
  const [sesh, setSesh] = useState([])
  const [movements, setMovements] = useState([])

  useEffect(() => {
    const foundSesh = props.session.find(sesh => {
     return sesh.id === params.id
    })
    setSesh(foundSesh);
  }, [params.id, props.session])

  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }
    const foundMove = props.movements.find(move => {
      sesh.fields.movements.find(movement => {
        return move.id === movements
     })
    })
    setMovements(foundMove)
    console.log(movements);
  }, [sesh, props.movements])

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
       {/* <div className="logo-div">
       <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      <div className='form-div'>

        {
          sesh.fields && movements.fields
            ?           
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
                  movements.map(move => {
                    <div className='movement'>
                      <input className='movement-name' type="text" value={move.fields.movement} readOnly /><br />
                      <input className='weight' type="text" value={move.fields.weight} readOnly />
                      <input className='rpe' type="text" value={move.fields.rpe} readOnly /><br />
                      <input className='reps' type="text" value={move.fields.reps} readOnly />
                      <input className='sets' type="text" value={move.fields.sets} readOnly />
                      <textarea className='notes' value={move.fields.notes} readOnly></textarea>
                    </div>
                  })
                }
            </div>
            <div className="action-buttons">
              <button className='send-session'>Edit</button>
              <button onClick={handleDelete} className='cancel-session'>Delete</button>
            </div>
          </form>
          : <h1>Loading...</h1>
        }
      </div> */}
    </div>
  )
}

export default Session
