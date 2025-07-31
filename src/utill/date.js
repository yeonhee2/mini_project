function data(artist) {
  const event=([])
  const currentYear = new Date().getFullYear();
  for( let i=0; i<artist.length; i++) {
    event.push({
        title: `${artist[i].group} 데뷔🎤`,
        date: artist[i].debut.replace(artist[i].debut.substring(0,4), currentYear),
        color: artist[i].color,
        textColor: artist[i].fontcolor
    })   
    for( let j=0; j<artist[i].member.length; j++ ) {
      event.push({
        title: `${artist[i].member[j].name} 생일🎉`,
        date: artist[i].member[j].birthday.replace(artist[i].member[j].birthday.substring(0,4), currentYear),
        color: artist[i].member[j].color,
        textColor: artist[i].member[j].fontcolor
       })
    }
   
  }

  for(let k=0; k<artist.length;k++) {
    event.push({
      title: `${artist[k].group}- ${artist[k].fanclupname}`,
      date : artist[k].fanclupdate.replace(artist[k].fanclupdate.substring(0,4), currentYear),
      color: artist[k].color,
      textColor: artist[k].fontcolor
    })
  }

  return event
}

export default data

