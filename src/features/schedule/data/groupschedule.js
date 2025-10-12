function gpskd(schedule) {
  const event = ([])

  for(let i = 0 ; i< schedule.sd.length; i++ ) {
    event.push( {
      title: schedule.sd[i].name,
      start: schedule.sd[i].gpsdate,
      color : schedule.color,
      type : schedule.sd[i].type
    })
  }

  return event
}

export default gpskd
