function memskd(memscheduleDto) {
  const list =
    (Array.isArray(memscheduleDto?.memskd) && memscheduleDto.memskd) ||
    (Array.isArray(memscheduleDto?.schedules) && memscheduleDto.schedules) ||
    [];

  const events = [];
  for (const it of list) {
    const start = it?.skddate || it?.scheduleDate || it?.date;
    const title = it?.title || it?.name;
    if (!start || !title) continue;

    const memname = it?.memname || it?.memberName || it?.name || "";
    const color = it?.color || "#00B6F0";
    const type = it?.type || "S";

    events.push({
      title: memname ? `${title} | ${memname}` : title,
      start,
      color,
      type,
    });
  }

  return events;
}

export default memskd;
