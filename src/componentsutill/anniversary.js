
function annivers(group) {
  const event = ([])
  const currentYear = new Date().getFullYear();

  event.push({
    title: `${group.group} 데뷔🎤`,
    date: group.debut.replace(group.debut.substring(0,4),currentYear),
    color: group.color,
    textColor: group.fontColor
  })

 
  for( let i = 0; i < group.member.length; i++ ) {
    event.push({
      title: `${group.member[i].name} 생일🎉`,
      date: group.member[i].birthday.replace(group.member[i].birthday.substring(0,4), currentYear),
      color: group.member[i].color,
      textColor: group.member[i].fontColor
    })
  }

  return event
}

export default annivers