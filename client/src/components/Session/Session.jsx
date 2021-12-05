import React from 'react'
import Logo from '../photos/logo.png'
import MovementTwo from '../MovementTwo'
import Movement from '../Movement/Movement'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sessionUrl, config } from '../Services/index'
import axios from 'axios'

 
function Session(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [sesh, setSesh] = useState({})
  const [movements, setMovements] = useState([])

  useEffect(() => {
    const foundSesh = props.session.find(sesh => {
     return sesh.id === params.id
    })
    setSesh(foundSesh);
  }, [params.id, props.session])

  useEffect(() => {
    // const foundMove = props.movements.find(move => {
    //  return move.id === sesh.fields.movements[0]
    // })
    const foundMove2 = props.movements.find(move => {
      return move.id === sesh.fields.movementtwo[0]
     })
    setMovements(foundMove2);
  }, [props.movements, sesh])

  const handleDelete = async () => {
    const res = await axios.delete(`${sessionUrl}/${params.id}`, config)
    props.setToggle(prevToggle => !prevToggle)
    if (res) {
      navigate('/')
    }
  }

  return (
    <div>
       <div className="logo-div">
       <Link to='/'><img className='logo' src={Logo} alt="" /></Link>
        </div>
      {/* <h1>This is a session view page</h1> */}
      <div className='form-div'>
        <form className='session'>
          <div className='name'>
            <label>
              <input className='session-name' type="text"
                placeholder='Session Name' />
            </label>
          </div>
          <div className='add-a-movement'>
          </div>
          <div className='date'>
            <input className='date-value'
              type="date" />
          </div>
          <div className='sessions-div'>
          <Movement />
            <MovementTwo />
            </div>
          <div className="action-buttons">
            <button className='send-session'>Edit</button>
            <button onClick={ handleDelete } className='cancel-session'>Delete</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default Session
