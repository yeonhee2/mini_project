import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MainPage from './mainpage/MainPage'
import Header from './components/ui/Header'
import Day6 from './groups/day6/Day6'
import Twice from './groups/twice/Twice'
import Straykids from './groups/straykids/Straykids'
import Itzy from './groups/itzy/Itzy'
import Nmixx from './groups/nmixx/Nmixx'
import NiziU from './groups/niziu/Niziu'
import AlbumPage from './features/album/pages/AlbumPage'
import Spinners from './components/ui/Spinner'


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

  if(artist.length === 0) {
    return <Spinners size={44} label='아티스트 정보 불러오는 중...' showLabel position='center' />     
  }

  if(album.length === 0) {
    return <Spinners size={44} label='앨범 정보 불러오는 중...' showLabel position='center' />
  }
  
  if(concert.length === 0) {
    return <Spinners label='콘서트 일정 불러오는중...' showLabel position="container" />
  }

  if(artistPlayList.length === 0) {
    return <Spinners label='플레이 리스트 불러오는중...' showLabel position="container" />
  }

  if(groupevent.length === 0) {
    return <Spinners label='그룹 스케줄 불러오는중...' showLabel position="container" />
  }

  if(memevent.length === 0) {
    return <Spinners label='멤버 스케줄 불러오는중...' showLabel position="container" />
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage artist={artist} album={album} concert={concert}/>} />
        <Route path='/day6/20150907' 
          element={<Day6  group={artist[0]} performance={concert[0]} suggest={artistPlayList[0]} album={album[0]} schedule={groupevent[0]}  memschedule={memevent[0]} />} 
        />
        <Route path='/twice/20151020' 
          element={<Twice group={artist[1]} performance={concert[1]} suggest={artistPlayList[1]} album={album[1]} schedule={groupevent[1]} memschedule={memevent[1]} />} 
        />
        <Route path='/straykids/20180325' 
          element={<Straykids  group={artist[2]} performance={concert[2]} suggest={artistPlayList[2]} album={album[2]} schedule={groupevent[2]} memschedule={memevent[2]} />} 
        />
        <Route path='/itzy/20190212' 
          element={<Itzy  group={artist[3]} performance={concert[3]} suggest={artistPlayList[3]} album={album[3]} schedule={groupevent[3]}  memschedule={memevent[3]} />} 
        />
        <Route path='/nmixx/20220222' 
          element={<Nmixx group={artist[4]} performance={concert[4]} suggest={artistPlayList[4]} album={album[4]} schedule={groupevent[4]} memschedule={memevent[4]} />} 
        />
        <Route path='/niziu/20201202' 
          element={<NiziU  group={artist[5]} performance={concert[5]} suggest={artistPlayList[5]} album={album[5]} schedule={groupevent[5]} memschedule={memevent[5]} />} 
        />
        <Route path='/album/:group' 
          element={<AlbumPage />} 
        />
        <Route path='*' element={<h1>존재하지 않는 페이지</h1>} />
      </Routes>
    </>
  )
}

export default App
