import Calendars from "../maincomponents/Calendars"
import Carousel from "../maincomponents/Carousel"

function MainPage({artist}) {
  return(
    <div>
      <Carousel />
      <Calendars artist={artist}/>
    </div>
  )
}

export default MainPage