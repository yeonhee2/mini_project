import Calendars from "../features/schedule/pages/Calendars"
import Carousel from "../features/album/components/Carousel"
import { useEffect, useState } from "react"
import { setPageTitle } from "../utill/setTitle"
import Footer from "../components/ui/Footer"
import Spinners from "../components/ui/Spinner"


function MainPage({ artist, album, concert}) {
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [calendarLoading, setCalendarLoading] = useState(true);
  
  useEffect(() => {
    setPageTitle("Idol Note")
  },[])

  useEffect(() => {
    if (artist?.length) {
      const t = setTimeout(() => setCarouselLoading(false), 1200);
      return () => clearTimeout(t);
    }
  }, [artist]);

  useEffect(() => {
    if (artist?.length || album?.length || concert?.length) {
      const t = setTimeout(() => setCalendarLoading(false), 1200);
      return () => clearTimeout(t);
    }
  }, [artist, album, concert]);

  return(
    <div style={{marginBottom: '180px'}} >
      <section style={{ position: "relative", minHeight: 220 }}>
        {carouselLoading ? (
          <Spinners size={24} label="이미지 불러오는중.." showLabel position="container"/>
        ) : (
          <Carousel 
            artist={artist} 
            onReady={() => setCarouselLoading(false)}
          />
        ) }
        {calendarLoading ? (
          <Spinners size={25} label="일정 불러오는중.." showLabel position="container"/>
        ) : (
          <Calendars 
            artist={artist} 
            album={album} 
            concert={concert}
            onReady={() => setCalendarLoading(false)}
          />
        ) }
      </section>
      <Footer />
    </div>
  )
}

export default MainPage