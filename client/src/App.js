import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { sessionUrl, config, movementUrl } from './components/Services/index'
import HomePage from './components/HomePage/HomePage';
import NewSession from './components/NewSession/NewSession';
import Session from './components/Session/Session'

function App() {

  const [session, setSession] = useState([])
  const [movements, setMovements] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getApiData = async () => {
      const res = await axios.get(sessionUrl, config)
      setSession(res.data.records);
      console.log(session);
    }
    getApiData()
  }, [toggle])

  useEffect(() => {
    const getMovementData = async () => {
      const res = await axios.get(movementUrl, config)
      setMovements(res.data.records);
    }
    getMovementData()
  }, [session])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage session={session} movements={movements}/>} />
        <Route path='/new-session' element={<NewSession setToggle={setToggle} />}/>
        <Route path='/session/:id' element={<Session session={session} movements={movements} />} setToggle={ setToggle } />
      </Routes>
    </div>
  );
}

export default App;
