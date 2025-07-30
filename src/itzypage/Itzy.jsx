import ArtistPage from "../components/ArtistPage"

function Itzy({group, performance, suggest, album}) {
  
  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} />
  )  
}

export default Itzy