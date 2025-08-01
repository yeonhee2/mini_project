import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function NiziU ( {group, performance, suggest, album,schedule} ) {

  useEffect(() => {
    setPageTitle("WithU♡")
  })

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule}/>
  )
}

export default NiziU