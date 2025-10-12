export function parseYMD(ymd) {
  if (ymd instanceof Date) return ymd;
  const [y, m, d] = String(ymd).split("-").map(Number);
  return new Date(y, m - 1, d); // 월은 0부터
}

// 만 나이 (기준일 없으면 오늘)
export function getAge(birthYMD, refDate = new Date()) {
  if (!birthYMD || birthYMD.trim() === "") return null;
  const b = parseYMD(birthYMD);
  const r = parseYMD(refDate);

  let age = r.getFullYear() - b.getFullYear();
  const notYetBirthday =
    r.getMonth() < b.getMonth() ||
    (r.getMonth() === b.getMonth() && r.getDate() < b.getDate());
  if (notYetBirthday) age -= 1;
  return age;
}