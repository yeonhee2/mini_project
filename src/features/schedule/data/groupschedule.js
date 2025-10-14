function gpskd(schedule) {
  const event = ([])

  for(let i = 0 ; i< schedule.sd.length; i++ ) {
    if(schedule.sd[i].cast === schedule.group){
      event.push( {
        title: schedule.sd[i].name,
        start: schedule.sd[i].gpsdate,
        color : schedule.sd[i].color,
        type : schedule.sd[i].type
      })
    } else {
      event.push( {
        title: `${schedule.sd[i].name} | ${schedule.sd[i].cast}` ,
        start: schedule.sd[i].gpsdate,
        color : schedule.sd[i].color,
        type : schedule.sd[i].type
      })
    }
  }

  return event
}

export default gpskd
