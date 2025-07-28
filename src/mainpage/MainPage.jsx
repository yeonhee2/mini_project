import Calendars from "../maincomponents/Calendars"
import Carousel from "../maincomponents/Carousel"

function MainPage({artist, album, concert}) {
  return(
    <div>
      <Carousel />
      <Calendars artist={artist} album={album} concert={concert}/>
    </div>
  )
}

export default MainPage