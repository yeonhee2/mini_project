import { useEffect } from "react"
import ArtistPage from "../../features/artist/pages/ArtistPage"
import { setPageTitle } from "../../utill/setTitle"

function Nmixx({group, performance, suggest, album,schedule, memschedule}) {

  useEffect(() => {
    setPageTitle("NSWER♡")
  })
    

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )  
}

export default Nmixx