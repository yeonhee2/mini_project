function show(performance) {
  const event=([])
  for(let i = 0; i<performance.concertdate.length; i++) {
    event.push({
      title: `${performance.concertdate[i].title} - ${performance.concertdate[i].country}`,
      start: performance.concertdate[i].date,
      color: performance.color,
      type: performance.concertdate[i].type
    })
  }

  return event

}

export default show