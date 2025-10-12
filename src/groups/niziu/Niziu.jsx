import { useEffect } from "react"
import { setPageTitle } from "../../utill/setTitle"
import ArtistPage from "../../features/artist/pages/ArtistPage"

function NiziU ( {group, performance, suggest, album,schedule, memschedule} ) {

  useEffect(() => {
    setPageTitle("WithU♡")
  })

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )
}

export default NiziU