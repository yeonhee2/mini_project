import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function Day6( {group, performance, suggest, album, schedule, memschedule} ) {

  useEffect(() => {
    setPageTitle("My Day♡")
  })

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} schedule={schedule} memschedule={memschedule}/>
  )
}

export default Day6