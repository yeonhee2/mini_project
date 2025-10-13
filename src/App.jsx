import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import ScrollTopButton from './components/ui/ScrollTopButton'
import Routers from './Routers'


function App() {
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [concert, setConcert] = useState([]);
  const [artistPlayList, setArtistPlayList] =useState([]);
  const [groupevent, setGroupEvent] =useState([]);
  const [memevent, setMemEvent] =useState([]);
  

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

  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/gpschedule.json')
     .then( (response) => {
      setGroupEvent([...response.data])
     }) 
     .catch((error) => {
      console.log(error)
     })
  }, [])
  useEffect( () => {
    axios.get('https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/memschedule.json')
     .then( (response) => {
      setMemEvent([...response.data])
     }) 
     .catch((error) => {
      console.log(error)
     })
  }, [])

  return (
    <>
      <Header />

      <Routers 
        artist={artist} 
        concert={concert} 
        artistPlayList={artistPlayList} 
        album={album} 
        groupevent={groupevent} 
        memevent={memevent} 
      />

      <ScrollTopButton />
    </>
  )
}

export default App
