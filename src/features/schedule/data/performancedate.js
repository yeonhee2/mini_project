function show(performance) {
  const pick = (obj, keys) => {
    for (const k of keys) {
      const v = obj?.[k];
      if (v !== undefined && v !== null) return v;
    }
    return null;
  };

  // ✅ concertdate / concerts / dates 등 후보
  const cd =
    (Array.isArray(performance?.concertdate) && performance.concertdate) ||
    (Array.isArray(performance?.concertDate) && performance.concertDate) ||
    (Array.isArray(performance?.concerts) && performance.concerts) ||
    [];

  const groupName = pick(performance, ["group", "artist", "artistName"]);

  const events = [];
  for (const it of cd) {
    const start = pick(it, ["date", "concertdate", "concertDate"]);
    const title = pick(it, ["title", "name"]);
    if (!start || !title) continue;

    const artistname = pick(it, ["artistname", "artistName", "cast"]) || groupName;
    const country = pick(it, ["country", "place", "location"]) || "";
    const color = pick(it, ["color"]) || "#00B6F0";
    const type = pick(it, ["type"]) || "E";

    events.push({
      title: country ? `${artistname} | ${title} in ${country}` : `${artistname} | ${title}`,
      start,
      color,
      type,
    });
  }

  return events;
}

export default show;

