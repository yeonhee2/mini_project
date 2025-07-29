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

  return event
}

export default data

