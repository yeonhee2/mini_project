function data(artists = []) {
  const events = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  // yyyy-mm-dd 포맷터
  const fmt = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // 같은 월/일 유지하며 연도만 현재 연도로 교체 (2/29 보정 포함)
  const toThisYear = (iso) => {
    if (!iso) return null;
    const base = new Date(iso);
    if (isNaN(base)) return null;
    const d = new Date(base);
    d.setFullYear(currentYear);

    // 2/29가 평년이면 JS가 3/1로 넘어갈 수 있어 보정
    if (base.getMonth() === 1 && base.getDate() === 29 && d.getMonth() === 2) {
      // 3/1로 넘어갔다면 하루 빼서 2/29 → 2/28
      d.setDate(0);
    }
    return fmt(d);
  };

  // 올해 기준으로 '라벨에 표시할 주년 수'만 계산 (오늘과 무관)
  const annivYears = (iso) => {
    if (!iso) return 0;
    const start = new Date(iso);
    if (isNaN(start)) return 0;
    // 올해 이벤트(= toThisYear 로 만든 날짜)에 붙일 주년 숫자
    return Math.max(0, currentYear - start.getFullYear());
  };

  for (let i = 0; i < artists.length; i++) {
    const g = artists[i];

    // 1) 데뷔 (주년 표시)
    if (g?.debut) {
      const start = toThisYear(g.debut);
      const years = annivYears(g.debut);
      events.push({
        title: years > 0 ? `${g.group} 데뷔 ${years}주년 🎤` : `${g.group} 데뷔 🎤`,
        start,
        color: g?.color,
        type: "A",
        extendedProps: {
          kind: "debut",
          since: g.debut,
          years,
        },
      });
    }

    // 2) 멤버 생일
    const members = Array.isArray(g?.member) ? g.member : [];
    for (let j = 0; j < members.length; j++) {
      const m = members[j];
      const bday = toThisYear(m?.birthday);
      if (!bday) continue;
      events.push({
        title: `🎂HAPPY ${m?.name} DAY🎂`,
        start: bday,
        color: m?.color || g?.color,
        type: "A",
        extendedProps: {
          kind: "birthday",
          name: m?.name,
          since: m?.birthday,
        },
      });
    }

    // 3) 팬클럽 결성 (주년 표시)
    if (g?.fanclupdate) {
      const start = toThisYear(g.fanclupdate);
      const years = annivYears(g.fanclupdate);
      events.push({
        title:
          years > 0
            ? `${g.group} - ${g.fanclupname} ${years}주년 ♡`
            : `${g.group} - ${g.fanclupname} ♡`,
        start,
        color: g?.color,
        type: "A",
        extendedProps: {
          kind: "fanclub",
          fanclub: g?.fanclupname,
          since: g.fanclupdate,
          years,
        },
      });
    }
  }

  return events;
}

export default data;

