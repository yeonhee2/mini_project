function concerts(concert) {
  const event=([])

  for( let i=0; i<concert.length; i++) {
    for(let j=0; j<concert[i].concertdate.length;j++) {
      event.push({
          title: `${concert[i].group} - ${concert[i].concertdate[j].country} 🎫`,
          start: concert[i].concertdate[j].start,
          end: concert[i].concertdate[j].end,
          color: concert[i].color,
          textColor: concert[i].fontcolor
      })
    }
  }

  return event
}

export default concerts