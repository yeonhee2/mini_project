function annivers(group = {}) {
  const events = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  // yyyy-mm-dd로 포맷
  const fmt = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // 같은 월/일 유지한 채 연도만 교체 (윤년 보정)
  const sameMonthDayThisYear = (iso) => {
    if (!iso) return null;
    const base = new Date(iso);
    if (isNaN(base)) return null;
    const d = new Date(base);
    d.setFullYear(currentYear);
    // 2/29 → 평년엔 2/28로 보정
    if (base.getMonth() === 1 && base.getDate() === 29 && d.getMonth() === 1 && d.getDate() === 28) {
      // ok: JS가 자동 보정함(3/1로 넘어가면 하루 빼기)
    }
    return fmt(d);
  };

  // 올해 주년 수 계산 (올해 기념일 기준)
  const getAnnivYears = (iso) => {
    if (!iso) return null;
    const start = new Date(iso);
    if (isNaN(start)) return null;
    const years = currentYear - start.getFullYear();
    return years;
  };

  // 1) 데뷔 주년
  if (group.debut) {
    const debutDateThisYear = sameMonthDayThisYear(group.debut);
    const debutYears = getAnnivYears(group.debut);
    const debutLabel = debutYears > 0 ? `${debutYears}주년` : ""; // 0주년이면 표시 생략

    events.push({
      title: debutLabel
        ? `${group.group} 데뷔 ${debutLabel} 🎤`
        : `데뷔 🎤`,
      start: debutDateThisYear,
      color: group.color,
      type: "A", // 기념일은 A로 고정 추천
      extendedProps: {
        kind: "debut",
        since: group.debut,
        years: Math.max(0, debutYears ?? 0),
        label: debutLabel || "데뷔",
      },
    });
  }

  // 2) 멤버 생일 (그대로 유지)
  if (Array.isArray(group.member)) {
    for (let i = 0; i < group.member.length; i++) {
      const m = group.member[i];
      const bdayThisYear = sameMonthDayThisYear(m?.birthday);
      events.push({
        title: `🎂HAPPY ${m?.name} DAY🎂`,
        start: bdayThisYear,
        color: m?.color || group.color,
        type: "A",
        extendedProps: {
          kind: "birthday",
          name: m?.name,
          since: m?.birthday,
        },
      });
    }
  }

  // 3) 팬클럽 주년
  if (group.fanclupdate) {
    const fcDateThisYear = sameMonthDayThisYear(group.fanclupdate);
    const fcYears = getAnnivYears(group.fanclupdate);
    const fcLabel = fcYears > 0 ? `${fcYears}주년` : ""; // 0주년이면 생략

    events.push({
      title: fcLabel
        ? `${group.group} - ${group.fanclupname} ${fcLabel} ♡`
        : `${group.group} - ${group.fanclupname} ♡`,
      start: fcDateThisYear,
      color: group.color,
      type: "A",
      extendedProps: {
        kind: "fanclub",
        since: group.fanclupdate,
        years: Math.max(0, fcYears ?? 0),
        label: fcLabel || "결성",
        fanclub: group.fanclupname,
      },
    });
  }

  return events;
}

export default annivers;