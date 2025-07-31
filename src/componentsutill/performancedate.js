function show(performance) {
  const event=([])
  for(let i = 0; i<performance.concertdate.length; i++) {
    event.push({
      title: `${performance.group} - ${performance.concertdate[i].country} 🎫`,
      start: performance.concertdate[i].start,
      end: performance.concertdate[i].end,
      allDay: true,
      color: performance.color,
      textColor: performance.fontcolor
    })
  }

  return event

}

export default show