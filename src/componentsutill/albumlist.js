function albumlist( album ) {
  const event = ([])
  for(let i=0; i<album.music.length; i++) {
    event.push({
      title: `${album.music[i].groupsolo}- ${album.music[i].albumname} 📀`,
      date: album.music[i].Releasedate,
      color: album.music[i].color,
      textColor: album.music[i].fontcolor
    })
  }

  return event
}

export default albumlist