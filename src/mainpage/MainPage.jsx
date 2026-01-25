import Calendars from "../features/schedule/pages/Calendars"
import Carousel from "../features/album/components/Carousel"
import { useEffect, useState } from "react"
import { setPageTitle } from "../utill/setTitle"
import Footer from "../components/ui/Footer"
import Spinners from "../components/ui/Spinner"


function MainPage({ artist, album, concert}) {
  const [carouselReady, setCarouselReady] = useState(false);
  const [calendarReady, setCalendarReady] = useState(false);
  
  useEffect(() => {
    setPageTitle("Idol Note")
  },[])

  // 데이터 준비 여부(시간이 아니라 실제 데이터 기준)
  const hasArtist = (artist?.length ?? 0) > 0;
  const hasCalendarData = hasArtist || (album?.length ?? 0) > 0 || (concert?.length ?? 0) > 0;

  // 데이터가 바뀌면 ready 다시 false (그룹 추가/변경 등 대비)
  useEffect(() => {
    setCarouselReady(false);
  }, [hasArtist]);

  useEffect(() => {
    setCalendarReady(false);
  }, [hasCalendarData]);

  const showCarouselSpinner = !hasArtist || !carouselReady;
  const showCalendarSpinner = !hasCalendarData || !calendarReady;

  return(
    <div style={{ marginBottom: "180px" }}>
      <section style={{ position: "relative", minHeight: 220 }}>
        {showCarouselSpinner ? (
          <Spinners size={24} label="이미지 불러오는중.." showLabel position="container" />
        ) : (
          <Carousel artist={artist} onReady={() => setCarouselReady(true)} />
        )}

        {showCalendarSpinner ? (
          <Spinners size={25} label="일정 불러오는중.." showLabel position="container" />
        ) : (
          <Calendars
            artist={artist}
            album={album}
            concert={concert}
            onReady={() => setCalendarReady(true)}
          />
        )}
      </section>

      <Footer />
    </div>
  )
}

export default MainPage