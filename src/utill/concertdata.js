function concerts(concert) {
  const event=([])

  for( let i=0; i<concert.length; i++) {
    event.push({
        title: `${concert[i].group} - ${concert[i].country} 🎫`,
        start: concert[i].start,
        end: concert[i].end,
        allDay: true,
        color: concert[i].color,
        textColor: concert[i].fontcolor
    })
  }

  return event
}

export default concerts