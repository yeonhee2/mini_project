import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function Day6( {group, performance, suggest, album} ) {

  useEffect(() => {
    setPageTitle("My Day♡")
  })

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} />
  )
}

export default Day6