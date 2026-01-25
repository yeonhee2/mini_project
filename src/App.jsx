import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/ui/Header'
import ScrollTopButton from './components/ui/ScrollTopButton'
import Routers from './Routers'
import { useLocation } from 'react-router-dom'
import { frontApi } from '@/api/frontApi'
import Spinners from '@/components/ui/Spinner'

// 타임아웃 유틸 (Render free cold start 대비)
function withTimeout(promise, ms = 8000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

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

    const initData = async () => {
      // 1) 워밍업(첫 요청)만 짧게 시도 — 오래 걸리면 포기하고 UI는 그냥 보여줌
      setBooting(true);
      try {
        await withTimeout(frontApi.getAlbums(), 6000); // 6초만 기다림
      } catch (e) {
        // timeout 나도 괜찮음 (UI는 먼저 띄우고 데이터는 계속 시도)
      } finally {
        if (alive) setBooting(false);
      }

      // 2) 실제 데이터는 “각각” 독립적으로 로딩(한 개가 느려도 다른 건 먼저 채워짐)
      const safeSet = (setter) => (data) => alive && setter(data);

      frontApi.getArtists().then((r) => r?.ok && safeSet(setArtist)(r.data));
      frontApi.getAlbums().then((r) => r?.ok && safeSet(setAlbum)(r.data));
      frontApi.getConcerts().then((r) => r?.ok && safeSet(setConcert)(r.data));
      frontApi.getPlaylists().then((r) => r?.ok && safeSet(setArtistPlayList)(r.data));
      frontApi.getGroupSchedules().then((r) => r?.ok && safeSet(setGroupEvent)(r.data));
      frontApi.getMemberSchedules().then((r) => r?.ok && safeSet(setMemEvent)(r.data));
    };

    initData();

    return () => {
      alive = false;
    };
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
