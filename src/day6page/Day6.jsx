import ArtistPage from "../components/ArtistPage"

function Day6( {group, performance, suggest, album} ) {

  return (
    <ArtistPage group={group} performance={performance} suggest={suggest} album = {album} />
  )
}

export default Day6