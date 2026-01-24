function toYMD(input) {
  if (!input) return null;

  // 이미 YYYY-MM-DD
  if (typeof input === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
    // ISO 문자열이면 날짜만
    if (input.includes("T")) return input.split("T")[0];
    return null;
  }

  // Date 객체
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

// YYYY-MM-DD -> Date(로컬)
function ymdToDate(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function buildDotIndex(events) {
  const index = new Map();
  const arr = Array.isArray(events) ? events : [];

  for (const ev of arr) {
    // start 후보들까지 커버
    const start =
      toYMD(ev.start) ||
      toYMD(ev.date) ||
      toYMD(ev.startDate) ||
      toYMD(ev.schedule_date);

    if (!start) continue;

    // end도 후보 커버
    const endRaw = toYMD(ev.end) || toYMD(ev.endDate);

    // end 처리: FullCalendar 관례(exclusive)로 맞추기 위해
    // end가 없으면 start 하루짜리
    // end가 있으면 [start, end] "포함" 데이터가 많아서,
    // 도트는 inclusive로 찍고 싶으면 아래 그대로,
    // exclusive로 찍고 싶으면 마지막날+1 처리.
    const end = endRaw || start;

    const sDate = ymdToDate(start);
    const eDate = ymdToDate(end);

    // start > end 방지
    if (sDate > eDate) continue;

    // 날짜 하루씩 펼치기 (inclusive)
    const cur = new Date(sDate);
    while (cur <= eDate) {
      const key = toYMD(cur);
      if (!index.has(key)) index.set(key, []);
      index.get(key).push(ev);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return index;
}
