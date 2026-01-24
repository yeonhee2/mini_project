function gpskd(scheduleDto) {
  const sd =
    (Array.isArray(scheduleDto?.sd) && scheduleDto.sd) ||
    (Array.isArray(scheduleDto?.schedules) && scheduleDto.schedules) ||
    [];

  const group = scheduleDto?.group;
  const events = [];

  for (const it of sd) {
    const start = it?.gpsdate || it?.scheduleDate || it?.date;
    const name = it?.name || it?.scheduleName || it?.title;
    if (!start || !name) continue;

    const cast = it?.cast || it?.castName || group;
    const color = it?.color || "#00B6F0";
    const type = it?.type || "S";

    events.push({
      title: cast === group ? name : `${name} | ${cast}`,
      start,
      color,
      type,
    });
  }

  return events;
}

export default gpskd;
