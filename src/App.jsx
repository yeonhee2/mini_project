import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './mainpage/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MainPage from './mainpage/MainPage'
import Day6 from './day6page/Day6'
import Twice from './twicepage/Twice'

function App() {
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [concert, setConcert] = useState([]);
  const [artistPlayList, setArtistPlayList] =useState([]);

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

  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/playlist.json')
     .then( (response) => {
      setArtistPlayList([...response.data])
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
        <Route path='/day6/20150907' element={<Day6 group={artist[0]} performance={concert[0]} suggest={artistPlayList[0]} album={album[0]} />} />
        <Route path='/twice/20151020' element={<Twice group={artist[1]} performance={concert[1]} suggest={artistPlayList[1]} album={album[1]}/>}/>
      </Routes>
    </>
  )
}

export default App
