import { useEffect } from "react"
import Calendars from "../maincomponents/Calendars"
import Carousel from "../maincomponents/Carousel"
import { setPageTitle } from "../utill/setTitle"

function MainPage({artist, album, concert}) {

  useEffect(() => {
    setPageTitle("JYP I-DOL")
  })

  return(
    <div style={{marginBottom: '180px'}} >
      <Carousel artist={artist} />
      <Calendars artist={artist} album={album} concert={concert}/>
    </div>
  )
}

export default MainPage