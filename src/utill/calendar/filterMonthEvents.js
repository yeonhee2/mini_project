// src/utils/calendar/filterMonthEvents.js
const ymd = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
};

export function filterMonthEvents(allEvents, monthStart, monthEndExclusive) {
  if (!monthStart || !monthEndExclusive) return [];
  const startISO = ymd(monthStart); // inclusive
  const endISO = ymd(monthEndExclusive); // exclusive

  // ev.start/ev.end는 normalizeEvents에서 YYYY-MM-DD로 정규화됨
  return (allEvents || []).filter((ev) => {
    const s = ev.start;
    const e = ev.end || ev.start;
    return s < endISO && e >= startISO; // 달과 겹치면 포함
  });
}
