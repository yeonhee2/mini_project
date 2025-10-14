function show(performance) {
  const event=([])
  for(let i = 0; i<performance.concertdate.length; i++) {
    if(performance.concertdate[i].artistname === performance.group){
      event.push({
        title: `${performance.concertdate[i].title} in ${performance.concertdate[i].country}`,
        start: performance.concertdate[i].date,
        color: performance.concertdate[i].color,
        type: performance.concertdate[i].type
      })
    } else {
      event.push({
        title: `${performance.concertdate[i].artistname} | ${performance.concertdate[i].title} in ${performance.concertdate[i].country}`,
        start: performance.concertdate[i].date,
        color: performance.concertdate[i].color,
        type: performance.concertdate[i].type
      })
    }
  }

  return event

}

export default show