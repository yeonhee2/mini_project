function concerts(concert) {
  const event=([])

  for( let i=0; i<concert.length; i++) {
    for(let j=0; j<concert[i].concertdate.length;j++) {
      event.push({
          title: `${concert[i].concertdate[j].artistname} | ${concert[i].concertdate[j].title} in ${concert[i].concertdate[j].country}`,
          start: concert[i].concertdate[j].date,
          color: concert[i].concertdate[j].color,
          type:concert[i].concertdate[j].type
      })
    }
  }

  return event
}

export default concerts