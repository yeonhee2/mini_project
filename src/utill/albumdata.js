function albums(album) {
  const event=([])

  for( let i=0; i<album.length; i++) {
    for(let j=0; j<album[i].music.length; j++) {
      event.push({
          title: `${album[i].music[j].groupsolo} | ${album[i].music[j].albumname} 📀`,
          start: album[i].music[j].Releasedate,
          color: album[i].music[j].color,
          type: album[i].music[j].type
      })
    }
  }

  return event
}

export default albums