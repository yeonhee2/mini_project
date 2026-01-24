import { useEffect, useMemo, useState } from "react";

function useMonthWeeks_Sunday(monthAnchor) {
  return useMemo(() => {
    if (!monthAnchor) return [];
    const y = monthAnchor.getFullYear();
    const m = monthAnchor.getMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const start = new Date(first);
    const dow = start.getDay(); // 0=Sun ~ 6=Sat
    start.setDate(first.getDate() - dow); // Sunday

    const weeks = [];
    const cur = new Date(start);
    while (cur <= last || cur.getMonth() === m) {
      weeks.push(new Date(cur));
      cur.setDate(cur.getDate() + 7);
    }
    return weeks;
  }, [monthAnchor]);
}

export default function WeekPager({ styles, monthAnchor, currentDate, onGotoWeek }) {
  const weeks = useMonthWeeks_Sunday(monthAnchor);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!weeks.length) return;

    let base = currentDate ? new Date(currentDate) : null;
    if (!base) {
      const today = new Date();
      const gridStart = new Date(weeks[0]);
      const gridEnd = new Date(weeks[weeks.length - 1]);
      gridEnd.setDate(gridEnd.getDate() + 6);
      if (today >= gridStart && today <= gridEnd) base = today;
    }

    let nextIdx = 0;
    if (base) {
      const found = weeks.findIndex((start) => {
        const s = new Date(start);
        const e = new Date(start);
        e.setDate(e.getDate() + 6);
        return base >= s && base <= e;
      });
      nextIdx = found >= 0 ? found : 0;
    }
    setIdx(nextIdx);
  }, [weeks, currentDate]);

  const goto = (next) => {
    if (!weeks.length) return;
    const clamped = Math.max(0, Math.min(next, weeks.length - 1));
    setIdx(clamped);
    onGotoWeek?.(weeks[clamped]);
  };

  if (!weeks.length) return null;

  return (
    <div className={styles.weekPager}>
      <button
        className={styles.weekBtn}
        onClick={() => goto(idx - 1)}
        aria-label="prev week"
        disabled={idx === 0}
      >
        ‹
      </button>

      <span className={styles.weekPagerText}>
        {idx + 1} / {weeks.length}
      </span>

      <button
        className={styles.weekBtn}
        onClick={() => goto(idx + 1)}
        aria-label="next week"
        disabled={idx === weeks.length - 1}
      >
        ›
      </button>
    </div>
  );
}
