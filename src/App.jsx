import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './mainpage/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MainPage from './mainpage/MainPage'
import Day6 from './day6page/Day6'

function App() {
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [concert, setConcert] = useState([]);

  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/artist.json')
     .then((response) => {
       setArtist([...response.data])
     })
     .catch((error) => {
      console.log(error)
     })
  }, [])

  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/album.json')
     .then((response) => {
       setAlbum([...response.data])
     })
     .catch((error) => {
      console.log(error)
     })
  }, [])

  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/concert.json')
     .then((response) => {
       setConcert([...response.data])
     })
     .catch((error) => {
      console.log(error)
     })
  }, [])


  
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage artist={artist} album={album} concert={concert}/>} />
        <Route path='/day6/20150907' element={<Day6 group={artist[0]}/>} />
      </Routes>
    </>
  )
}

export default App
