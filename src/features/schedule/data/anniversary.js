function annivers(group) {
  const event = ([])
  const currentYear = new Date().getFullYear();

  event.push({
    title: `데뷔🎤`,
    start: group.debut.replace(group.debut.substring(0,4),currentYear),
    color: group.color,
    type: group.type 
  })

 
  for( let i = 0; i < group.member.length; i++ ) {
    event.push({
      title: `${group.member[i].name} 생일🎉`,
      start: group.member[i].birthday.replace(group.member[i].birthday.substring(0,4), currentYear),
      color: group.member[i].color,
      type: group.member[i].type
    })
  }

  
  event.push({
    title: `${group.group}- ${group.fanclupname}`,
    start : group.fanclupdate.replace(group.fanclupdate.substring(0,4), currentYear),
    color: group.color,
    type: group.type 
  })
  

  return event
}

export default annivers