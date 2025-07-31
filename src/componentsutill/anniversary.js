
function annivers(group) {
  const event = ([])
  const currentYear = new Date().getFullYear();

  event.push({
    title: `${group.group} 데뷔🎤`,
    date: group.debut.replace(group.debut.substring(0,4),currentYear),
    color: group.color,
    textColor: group.fontcolor
  })

 
  for( let i = 0; i < group.member.length; i++ ) {
    event.push({
      title: `${group.member[i].name} 생일🎉`,
      date: group.member[i].birthday.replace(group.member[i].birthday.substring(0,4), currentYear),
      color: group.member[i].color,
      textColor: group.member[i].fontcolor
    })
  }

  
  event.push({
    title: `${group.group}- ${group.fanclupname}`,
    date : group.fanclupdate.replace(group.fanclupdate.substring(0,4), currentYear),
    color: group.color,
    textColor: group.fontcolor
  })
  

  return event
}

export default annivers