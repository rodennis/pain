import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { sessionUrl, config, movementUrl } from './components/Services/index'
import axios from 'axios';
import HomePage from './components/HomePage/HomePage';
import NewSession from './components/NewSession/NewSession';
import Session from './components/Session/Session'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {

  const mountedRef = useRef(false)
  const [session, setSession] = useState([])
  const [movements, setMovements] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const getApiData = async () => {
      const res = await axios.get(sessionUrl, config)
      if (mountedRef.current) {
        setSession(res.data.records);
      }
    }
    getApiData()
  }, [toggle])

  useEffect(() => {
    const getMovementData = async () => {
      const res = await axios.get(movementUrl, config)
      if (mountedRef.current) {
        setMovements(res.data.records);
      }
    }
    getMovementData()
  }, [session])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage session={session} movements={movements} />} />
        <Route path='/new-session' element={<NewSession setToggle={setToggle} />}/>
        <Route path='/session/:id' element={<Session session={session} movements={movements} toggle={toggle} setToggle={setToggle} />} />
        <Route path='/session/edit/:id' element={<NewSession session={session} movements={ movements }/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
