import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { sessionUrl, config, movementUrl } from './components/Services/index'
import HomePage from './components/HomePage/HomePage';
import NewSession from './components/NewSession/NewSession';

function App() {

  const [session, setSession] = useState([])
  const [movements, setMovements] = useState([])

  useEffect(() => {
    const getApiData = async () => {
      const res = await axios.get(sessionUrl, config)
      setSession(res.data.records[0].fields.movement);
    }
    getApiData()
  }, [])

  useEffect(() => {
    const getMovementData = async () => {
      const res = await axios.get(`${movementUrl}/${session}`, config)
      setMovements(res.data.records);
    }
    getMovementData()
  }, [session])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new-session' element={ <NewSession />} />
      </Routes>
    </div>
  );
}

export default App;
