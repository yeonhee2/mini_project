import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/ui/Header'
import ScrollTopButton from './components/ui/ScrollTopButton'
import Routers from './Routers'
import { useLocation } from 'react-router-dom'
import { frontApi } from '@/api/frontApi'
import Spinners from '@/components/ui/Spinner'


function App() {
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [concert, setConcert] = useState([]);
  const [artistPlayList, setArtistPlayList] =useState([]);
  const [groupevent, setGroupEvent] =useState([]);
  const [memevent, setMemEvent] =useState([]);

  const [booting, setBooting] = useState(true);

  const { pathname } = useLocation();
  const hideHeader = pathname.startsWith("/admin");
  

  useEffect( () => {
    let alive = true

    const initData = async () => {
      setBooting(true)

      try {
        await frontApi.getAlbums()
      } catch (e) {
        
      }

      // 모든 API 병렬 호출
      const [resArt, resAlb, resCon, resPlay, resGp, resMem] = await Promise.all([
        frontApi.getArtists(),
        frontApi.getAlbums(),
        frontApi.getConcerts(),
        frontApi.getPlaylists(),
        frontApi.getGroupSchedules(),
        frontApi.getMemberSchedules(),
      ]);

      if (!alive) return
      
      // 응답 데이터 상태 세팅
      if (resArt.ok) setArtist(resArt.data);
      if (resAlb.ok) setAlbum(resAlb.data);
      if (resCon.ok) setConcert(resCon.data);
      if (resPlay.ok) setArtistPlayList(resPlay.data);
      if (resGp.ok) setGroupEvent(resGp.data);
      if (resMem.ok) setMemEvent(resMem.data);

      setBooting(false)
    };

    initData();

    return () => {
      alive = false
    }
  }, [])

  if (booting) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <Spinners label="서버 깨우는 중..." showLabel />
      </div>
    );
  }

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
