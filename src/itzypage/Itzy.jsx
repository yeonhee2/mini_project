import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function Itzy({group, performance, suggest, album}) {

  useEffect(() => {
    setPageTitle("MIDZY♡")
  })
  
  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} />
  )  
}

export default Itzy