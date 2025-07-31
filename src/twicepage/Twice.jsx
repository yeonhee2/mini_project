import { useEffect } from "react"
import ArtistPage from "../components/ArtistPage"
import { setPageTitle } from "../utill/setTitle"

function Twice({group, performance, suggest, album}) {

  useEffect(() => {
    setPageTitle("ONCE♡")
  })
  

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} />
  )  
}

export default Twice