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

  const [booting, setBooting] = useState(false);

  const { pathname } = useLocation();
  const hideHeader = pathname.startsWith("/admin");
  

  useEffect(() => {
    let alive = true;

    const safeSet = (setter) => (data) => alive && setter(data);

    setBooting(true);

    // 워밍업 + 헤더 빨리 채우기(체감 속도↑)
    frontApi.getArtists()
      .then((r) => r?.ok && safeSet(setArtist)(r.data))
      .finally(() => alive && setBooting(false));

    // 나머지는 병렬로 “각자” 채우기
    frontApi.getAlbums().then((r) => r?.ok && safeSet(setAlbum)(r.data));
    frontApi.getConcerts().then((r) => r?.ok && safeSet(setConcert)(r.data));
    frontApi.getPlaylists().then((r) => r?.ok && safeSet(setArtistPlayList)(r.data));
    frontApi.getGroupSchedules().then((r) => r?.ok && safeSet(setGroupEvent)(r.data));
    frontApi.getMemberSchedules().then((r) => r?.ok && safeSet(setMemEvent)(r.data));

    return () => { alive = false; };
  }, []);

  return (
    <>
      {!hideHeader && <Header artist={artist} />}

      {/* App 전체 막지 말고, 위에만 “워밍업 오버레이” */}
      {booting && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,0.55)",
            zIndex: 9999,
            pointerEvents: "none", // 사용자는 클릭/스크롤 계속 가능
          }}
        >
          <Spinners label="서버 깨우는 중..." showLabel />
        </div>
      )}

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
