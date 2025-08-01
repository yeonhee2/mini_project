import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function Day6( {group, performance, suggest, album, schedule} ) {

  useEffect(() => {
    setPageTitle("My Day♡")
  })

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule}/>
  )
}

export default Day6