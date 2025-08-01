function gpskd(schedule) {
  const event = ([])

  for(let i = 0 ; i< schedule.sd.length; i++ ) {
    event.push( {
      title: schedule.sd[i].name,
      start: schedule.sd[i].start,
      end: schedule.sd[i].end,
      color : schedule.color,
      textColor : schedule.fontcolor
    })
  }

  return event
}

export default gpskd
