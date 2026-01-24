export function weekStartSunday(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // Sunday start
  return d;
}

export function monthRangeFromAnchor(anchorDate) {
  const y = anchorDate.getFullYear();
  const m = anchorDate.getMonth();
  const monthStart = new Date(y, m, 1);
  const monthEnd = new Date(y, m + 1, 1); // exclusive
  return { monthStart, monthEnd };
}
