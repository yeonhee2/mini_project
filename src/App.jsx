import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/ui/Header'
import ScrollTopButton from './components/ui/ScrollTopButton'
import Routers from './Routers'
import { useLocation } from 'react-router-dom'
import { frontApi } from '@/api/frontApi'


function App() {
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [concert, setConcert] = useState([]);
  const [artistPlayList, setArtistPlayList] =useState([]);
  const [groupevent, setGroupEvent] =useState([]);
  const [memevent, setMemEvent] =useState([]);

  const { pathname } = useLocation();
  const hideHeader = pathname.startsWith("/admin");
  

  useEffect( () => {
    const initData = async () => {
      // 모든 API 병렬 호출
      const [resArt, resAlb, resCon, resPlay, resGp, resMem] = await Promise.all([
        frontApi.getArtists(),
        frontApi.getAlbums(),
        frontApi.getConcerts(),
        frontApi.getPlaylists(),
        frontApi.getGroupSchedules(),
        frontApi.getMemberSchedules(),
      ]);
      
      // 응답 데이터 상태 세팅
      if (resArt.ok) setArtist(resArt.data);
      if (resAlb.ok) setAlbum(resAlb.data);
      if (resCon.ok) setConcert(resCon.data);
      if (resPlay.ok) setArtistPlayList(resPlay.data);
      if (resGp.ok) setGroupEvent(resGp.data);
      if (resMem.ok) setMemEvent(resMem.data);
    };

    initData();
  }, [])

  

  return (
    <>
      {!hideHeader && <Header artist={artist} />}

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
