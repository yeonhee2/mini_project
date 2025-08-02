function show(performance) {
  const event=([])
  for(let i = 0; i<performance.concertdate.length; i++) {
    event.push({
      title: `${performance.concertdate[i].title} - ${performance.concertdate[i].country}`,
      start: performance.concertdate[i].start,
      end: performance.concertdate[i].end,
      color: performance.color,
    })
  }

  return event

}

export default show