function albumlist(albumDto) {
  const music = Array.isArray(albumDto?.music) ? albumDto.music : [];

  const event = [];
  for (const it of music) {
    if (!it?.Releasedate || !it?.albumname) continue;

    const who = it?.subjectName || albumDto?.group || "UNKNOWN";

    event.push({
      title: `${who} | ${it.albumname} 📀`,
      start: it.Releasedate,
      color: it.color,
      type: it.type || "R",
      extendedProps: {
        groupsolo: it.groupsolo,      // SOLO/GROUP/UNIT 뱃지용
        subjectName: it.subjectName,  // ✅ 확인용
      },
    });
  }

  return event;
}

export default albumlist;
