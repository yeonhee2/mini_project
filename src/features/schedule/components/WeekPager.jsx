import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Calendars.module.css";

function toDateOnly(d) {
  const x = (d instanceof Date) ? d : new Date(d);
  return new Date(x.getFullYear(), x.getMonth(), x.getDate());
}

/** monthAnchor(그 달 어디쯤) 기준으로 "일요일 시작 주" 배열 반환 */
function useMonthWeeks(monthAnchor) {
  return useMemo(() => {
    if (!monthAnchor) return [];
    const a = toDateOnly(monthAnchor);
    const y = a.getFullYear();
    const m = a.getMonth();

    const first = new Date(y, m, 1);
    const last  = new Date(y, m + 1, 0);

    // 그 달 1일이 포함된 주의 '일요일'로 후퇴
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - first.getDay()); // Sunday

    // 그 달 마지막날이 포함된 주의 '토요일'까지 전진
    const gridEnd = new Date(last);
    gridEnd.setDate(last.getDate() + (6 - last.getDay())); // Saturday

    // 일요일 단위로 주 시작일 채우기
    const weeks = [];
    for (let cur = new Date(gridStart); cur <= gridEnd; cur.setDate(cur.getDate() + 7)) {
      weeks.push(new Date(cur));
    }
    return weeks;
  }, [monthAnchor]);
}

export default function WeekPager({ monthAnchor, onGotoWeek, currentDate }) {
  const weeks = useMonthWeeks(monthAnchor);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!weeks.length) return;

    // 1) currentDate 우선
    let base = currentDate ? toDateOnly(currentDate) : null;

    // 2) 없으면 오늘이 그리드 안이면 오늘
    if (!base) {
      const today = toDateOnly(new Date());
      const gridStart = weeks[0];                     // 이미 date-only
      const gridEnd   = new Date(weeks[weeks.length - 1]);
      gridEnd.setDate(gridEnd.getDate() + 6);         // 그 마지막 주의 토요일
      if (today >= gridStart && today <= gridEnd) base = today;
    }

    // 3) 주 인덱스 계산(일요일~토요일 범위)
    let nextIdx = 0;
    if (base) {
      const found = weeks.findIndex((start) => {
        const s = start;                  // 일요일
        const e = new Date(start);
        e.setDate(e.getDate() + 6);       // 토요일
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