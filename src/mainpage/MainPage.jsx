import Calendars from "../features/schedule/pages/Calendars"
import Carousel from "../features/album/components/Carousel"
import { useEffect, useState } from "react"
import { setPageTitle } from "../utill/setTitle"
import Footer from "../components/ui/Footer"
import Spinners from "../components/ui/Spinner"


function MainPage({ artist, album, concert}) {
  useEffect(() => {
    setPageTitle("Idol Note")
  },[])
  
  // 데이터 준비 여부(시간이 아니라 실제 데이터 기준)
  const hasArtist = artist && artist.length > 0;
  const hasCalendarData = hasArtist || (album?.length > 0) || (concert?.length > 0);

  return(
    <div style={{ marginBottom: "180px" }}>
      <section style={{ position: "relative", minHeight: 220 }}>
        
        {/* Carousel 영역 */}
        {!hasArtist ? (
          <Spinners size={24} label="이미지 불러오는중.." showLabel position="container" />
        ) : (
          <Carousel artist={artist} />
        )}

        {/* Calendar 영역 */}
        {!hasCalendarData ? (
          <Spinners size={25} label="일정 불러오는중.." showLabel position="container" />
        ) : (
          <Calendars
            artist={artist}
            album={album}
            concert={concert}
          />
        )}

      </section>

      <Footer />
    </div>
  )
}

export default MainPage