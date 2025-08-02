import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function NiziU ( {group, performance, suggest, album,schedule, memschedule} ) {

  useEffect(() => {
    setPageTitle("WithU♡")
  })

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )
}

export default NiziU