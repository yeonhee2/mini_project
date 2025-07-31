import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './mainpage/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MainPage from './mainpage/MainPage'
import Day6 from './day6page/Day6'
import Twice from './twicepage/Twice'
import Straykids from './straykidspage/Straykids'
import Itzy from './itzypage/Itzy'
import Nmixx from './nmixxpage/Nmixx'
import NiziU from './niziupage/Niziu'
import AlbumPage from './maincomponents/AlbumPage'


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

  if(artist.length === 0) {
    return <div>아티스트 정보 불러오는중...</div>
  }

  if(album.length === 0) {
    return <div>앨범 정보 불러오는중...</div>
  }
  
  if(concert.length === 0) {
    return <div>콘서트 일정 불러오는중...</div>
  }

  if(artistPlayList.length === 0) {
    return <div>플레이 리스트 불러오는중...</div>
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage artist={artist} album={album} concert={concert}/>} />
        <Route path='/day6/20150907' element={<Day6 group={artist[0]} performance={concert[0]} suggest={artistPlayList[0]} album={album[0]} />} />
        <Route path='/twice/20151020' element={<Twice group={artist[1]} performance={concert[1]} suggest={artistPlayList[1]} album={album[1]}/>}/>
        <Route path='/straykids/20180325' element={<Straykids group={artist[2]} performance={concert[2]} suggest={artistPlayList[2]} album={album[2]}/>}/>
        <Route path='/itzy/20190212' element={<Itzy group={artist[3]} performance={concert[3]} suggest={artistPlayList[3]} album={album[3]}/>}/>
        <Route path='/nmixx/20220222' element={<Nmixx group={artist[4]} performance={concert[4]} suggest={artistPlayList[4]} album={album[4]}/>}/>
        <Route path='/niziu/20201202' element={<NiziU group={artist[5]} performance={concert[5]} suggest={artistPlayList[5]} album={album[5]}/>} />
        <Route path='/album/:group' element={<AlbumPage />} />
        <Route path='*' element={<h1>존재하지 않는 페이지</h1>} />
      </Routes>
    </>
  )
}

export default App
