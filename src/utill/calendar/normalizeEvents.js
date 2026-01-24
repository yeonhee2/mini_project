export function normalizeEvents(rawEvents) {
  const ymdLocal = (d) => {
    const dt = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const da = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
  };

  const normalize = (val) => {
    if (!val) return null;
    if (typeof val === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
      return val.split("T")[0];
    }
    return ymdLocal(val);
  };

  const merged = (rawEvents || [])
    .map((ev) => {
      const start = normalize(ev.start ?? ev.date ?? ev.startDate ?? ev.when);
      const end = normalize(ev.end ?? ev.endDate ?? null);
      if (!start) return null;

      return {
        ...ev,
        title: (ev.title || "").replace(/\s+/g, " ").trim(),
        start,
        ...(end ? { end } : {}),
        allDay: ev.allDay ?? true,
        extendedProps: { ...(ev.extendedProps || {}), type: ev.type },
      };
    })
    .filter(Boolean);

  // 완전 동일 이벤트 dedupe
  const seen = new Set();
  const uniq = [];
  for (const ev of merged) {
    const key = `${ev.title}|${ev.extendedProps?.type ?? ""}|${ev.start}|${ev.end ?? ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniq.push(ev);
    }
  }
  return uniq;
}
