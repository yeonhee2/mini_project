import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function Straykids({group, performance, suggest, album,schedule, memschedule}) {

  useEffect(() => {
    setPageTitle("STAY♡")
  })
  
  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )  
}

export default Straykids