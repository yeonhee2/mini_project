import { useEffect } from "react"
import ArtistPage from "../../features/artist/pages/ArtistPage"
import { setPageTitle } from "../../utill/setTitle"

function Itzy({group, performance, suggest, album, schedule, memschedule}) {

  useEffect(() => {
    setPageTitle("MIDZY♡")
  })
  
  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )  
}

export default Itzy