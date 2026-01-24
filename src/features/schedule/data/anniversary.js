function annivers(group = {}) {
  const events = [];
  const currentYear = new Date().getFullYear();

  const pick = (obj, keys) => {
    for (const k of keys) {
      const v = obj?.[k];
      if (v !== undefined && v !== null && String(v).trim() !== "") return v;
    }
    return null;
  };

  const fmt = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const toThisYear = (iso) => {
    if (!iso) return null;
    const base = new Date(iso);
    if (isNaN(base)) return null;

    const d = new Date(base);
    d.setFullYear(currentYear);

    // 2/29 보정
    if (base.getMonth() === 1 && base.getDate() === 29 && d.getMonth() === 2) {
      d.setDate(0); // 2/28
    }
    return fmt(d);
  };

  const annivYears = (iso) => {
    const start = new Date(iso);
    if (isNaN(start)) return 0;
    return Math.max(0, currentYear - start.getFullYear());
  };

  const groupName = pick(group, ["group", "groupName", "name"]);
  const groupColor = pick(group, ["color", "groupColor"]) || "#00B6F0";

  // ✅ 데뷔일 키 후보들
  const debut = pick(group, ["debut", "debutDate", "debut_date"]);
  if (debut) {
    const start = toThisYear(debut);
    if (start) {
      const years = annivYears(debut);
      events.push({
        title: years > 0 ? `${groupName} 데뷔 ${years}주년 🎤` : `${groupName} 데뷔 🎤`,
        start,
        color: groupColor,
        type: "A",
      });
    }
  }

  // ✅ 멤버 생일 (member / members 둘 다)
  const members = Array.isArray(group?.member) ? group.member : Array.isArray(group?.members) ? group.members : [];
  for (const m of members) {
    const bday = pick(m, ["birthday", "birth", "birthDate"]);
    const start = toThisYear(bday);
    if (!start) continue;

    const name = pick(m, ["name", "memberName"]);
    const color = pick(m, ["color", "memberColor"]) || groupColor;

    events.push({
      title: `🎂HAPPY ${name} DAY🎂`,
      start,
      color,
      type: "A",
    });
  }

  // 팬클럽 결성일 키 후보들
  const fanDate = pick(group, ["fanclubdate", "fanclubDate", "fanclub_date", "fanclupdate"]);
  const fanName = pick(group, ["fanclubname", "fanclubName", "fanclub_name", "fanclupname"]);
  if (fanDate) {
    const start = toThisYear(fanDate);
    if (start) {
      const years = annivYears(fanDate);
      events.push({
        title: years > 0 ? `${groupName} - ${fanName} ${years}주년 ♡` : `${groupName} - ${fanName} ♡`,
        start,
        color: groupColor,
        type: "A",
      });
    }
  }

  return events;
}

export default annivers;
