import { useEffect } from "react"
import ArtistPage from "../../features/artist/pages/ArtistPage"
import { setPageTitle } from "../../utill/setTitle"

function Straykids({group, performance, suggest, album,schedule, memschedule}) {

  useEffect(() => {
    setPageTitle("STAY♡")
  })
  
  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )  
}

export default Straykids