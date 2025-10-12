function albumlist( album ) {
  const event = ([])
  for(let i=0; i<album.music.length; i++) {
    event.push({
      title: `${album.music[i].groupsolo}- ${album.music[i].albumname} 📀`,
      start: album.music[i].Releasedate,
      color: album.music[i].color,
      type: album.music[i].type
    })
  }

  return event
}

export default albumlist