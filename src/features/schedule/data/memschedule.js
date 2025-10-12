function memskd (memschedule) {
  const event=([])

  for(let i= 0; i<memschedule.memskd.length; i++ ) {
    event.push({
      title : `${memschedule.memskd[i].title} (${memschedule.memskd[i].memname})`,
      start : memschedule.memskd[i].skddate,
      color : memschedule.memskd[i].color,
      type : memschedule.memskd[i].type
    })
  }
  return event
}

export default memskd