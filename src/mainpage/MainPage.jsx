import Calendars from "../features/schedule/pages/Calendars"
import Carousel from "../features/album/components/Carousel"
import { useEffect } from "react"
import { setPageTitle } from "../utill/setTitle"

function MainPage({ artist, album, concert}) {
  
  useEffect(() => {
    setPageTitle("Idol Note")
  })

  return(
    <div style={{marginBottom: '180px'}} >
      <Carousel artist={artist} />
      <Calendars artist={artist} album={album} concert={concert}/>
    </div>
  )
}

export default MainPage