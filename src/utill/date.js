function data(artist) {
  const event=([])
  const currentYear = new Date().getFullYear();
  for( let i=0; i<artist.length; i++) {
    event.push({
        title: `${artist[i].group} 데뷔🎤`,
        start: artist[i].debut.replace(artist[i].debut.substring(0,4), currentYear),
        color: artist[i].color,
        type : artist[i].type 
    })   
    for( let j=0; j<artist[i].member.length; j++ ) {
      event.push({
        title: `${artist[i].member[j].name} 생일🎉`,
        start: artist[i].member[j].birthday.replace(artist[i].member[j].birthday.substring(0,4), currentYear),
        color: artist[i].member[j].color,
        type: artist[i].member[j].type 
       })
    }
   
  }

  for(let k=0; k<artist.length;k++) {
    event.push({
      title: `${artist[k].group}- ${artist[k].fanclupname}`,
      start : artist[k].fanclupdate.replace(artist[k].fanclupdate.substring(0,4), currentYear),
      color: artist[k].color,
      type : artist[k].type 
    })
  }

  return event
}

export default data

