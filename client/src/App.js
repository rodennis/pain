import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import HomePage from './components/HomePage/HomePage';
import NewSession from './components/NewSession/NewSession';
import Session from './components/Session/Session'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import api from './components/Services/apiConfig';

function App() {

  const mountedRef = useRef(false)
  const [session, setSession] = useState([])
  const [movements] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const getApiData = async () => {
      const res = await api.get('/sessions')
      console.log(res.data);
      if (mountedRef.current) {
        setSession(res.data);
      }
    }
    getApiData()
  }, [toggle])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage session={session} />} />
        <Route path='/new-session' element={<NewSession setToggle={setToggle} />}/>
        <Route path='/session/:id' element={<Session session={session}  toggle={toggle} setToggle={setToggle} />} />
        <Route path='/session/edit/:id' element={<NewSession session={session} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
