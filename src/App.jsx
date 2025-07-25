import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './mainpage/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MainPage from './mainpage/MainPage'

function App() {
  const [artist, setArtist] = useState([]);

  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/artist.json')
     .then((response) => {
       setArtist([...response.data])
     })
     .catch((error) => {
      console.log(error)
     })
  }, [])
  
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage artist={artist}/>} />
      </Routes>
    </>
  )
}

export default App
