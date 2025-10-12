import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "../styles/Schedule.module.css";

/* === 데이터 소스 === */
import annivers from "../data/anniversary";
import show from "../data/performancedate";
import albumlist from "../../album/data/albumlist";
import gpskd from "../data/groupschedule";
import memskd from "../data/memschedule";

/* =========================
   WeekPager (컴포넌트 포함)
   - monthAnchor(그 달의 1일 기준)로 해당 달 표시 주(일~토) 배열 계산
   - currentDate가 속한 주부터 인덱스 맞춰 표시
   ========================= */
function useMonthWeeks_Sunday(monthAnchor) {
  return useMemo(() => {
    if (!monthAnchor) return [];
    const y = monthAnchor.getFullYear();
    const m = monthAnchor.getMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    // 달력 첫 주의 일요일로 보정
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

function WeekPager({ monthAnchor, currentDate, onGotoWeek }) {
  const weeks = useMonthWeeks_Sunday(monthAnchor);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!weeks.length) return;

    // 기본: currentDate가 있으면 그 주, 없으면 '오늘'이 달력 범위에 있으면 오늘 주
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

/* =========================
   메인 Schedule
   ========================= */
export default function Schedule({
  performance,
  group,
  album,
  schedule,
  memschedule,
}) {
  const calendarRef = useRef(null);
  const monthRef = useRef(null);
  const listRef = useRef(null);
  const [monthRange, setMonthRange] = useState({ start: null, end: null });

  // “종일” 텍스트 제거
  const koNoAllDay = useMemo(() => ({ ...koLocale, allDayText: "" }), []);

  // 한 곳에서 이벤트 합치고 키 통일
  const allEvents = useMemo(() => {
    const ymd = (d) => {
      const dt = d instanceof Date ? d : new Date(d);
      if (Number.isNaN(dt.getTime())) return null;
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      const da = String(dt.getDate()).padStart(2, "0");
      return `${y}-${m}-${da}`;
    };
    const arr = (v) => (Array.isArray(v) ? v : []);

    const merged = [
      ...arr(annivers(group)),
      ...arr(show(performance)),
      ...arr(albumlist(album)),
      ...arr(gpskd(schedule)),
      ...arr(memskd(memschedule)),
    ]
      .map((ev) => {
        const start = ev.start ?? ev.date ?? ev.startDate;
        const end = ev.end ?? ev.endDate;
        return {
          ...ev,
          title: (ev.title || "").replace(/\s+/g, " ").trim(),
          start: start ? ymd(start) : null,
          ...(end ? { end: ymd(end) } : {}),
          allDay: true,
          extendedProps: { ...(ev.extendedProps || {}), type: ev.type },
        };
      })
      .filter((ev) => !!ev.start);

    // 완전 동일 이벤트 dedupe
    const seen = new Set();
    const uniq = [];
    for (const ev of merged) {
      const key = `${ev.title}|${ev.extendedProps?.type ?? ""}|${ev.start}|${
        ev.end ?? ""
      }`;
      if (!seen.has(key)) {
        seen.add(key);
        uniq.push(ev);
      }
    }
    return uniq;
  }, [performance, group, album, schedule, memschedule]);

  const monthFilteredEvents = useMemo(() => {
    if (!monthRange.start || !monthRange.end) return [];
    return allEvents.filter((ev) => {
      const s = new Date(ev.start);
      return s >= monthRange.start && s < monthRange.end;
    });
    // ‘달과 겹치면 포함’ 로직이 필요하면 아래로 교체:
    // return allEvents.filter((ev) => {
    //   const s = new Date(ev.start);
    //   const e = new Date(ev.end || ev.start);
    //   return s < monthRange.end && e >= monthRange.start;
    // });
  }, [allEvents, monthRange]);

  /* ===== 헤더/버튼 색상(옵션: 그룹 테마) ===== */
  useEffect(() => {
    const headerEl = calendarRef.current?.querySelector(".fc-header-toolbar");
    if (headerEl && group?.color) {
      headerEl.style.backgroundColor = group.color;
      headerEl.style.color = group.fontcolor || "#fff";
    }
    const buttons = calendarRef.current?.querySelectorAll(".fc-button");
    buttons?.forEach((btn) => {
      if (group?.color) {
        btn.style.backgroundColor = group.color;
        btn.style.borderColor = group.color;
        btn.style.color = group.fontcolor || "#fff";
      }
    });
  }, [group]);

  // 🔧 그룹 색 + 멤버 개인 색(중복 제거)으로 범례 만들기
  const colorLegend = useMemo(() => {
    const map = new Map();

    // 1) 그룹(필수)
    if (group?.group && group?.color) {
      map.set(group.group, group.color);
    }

    // 2) 그룹 객체에 멤버가 들어있는 경우 (group.member 또는 group.members)
    (group?.member || group?.members || []).forEach((m) => {
      const name = m?.name || m?.nick || m?.label;
      const color = m?.color;
      if (name && color && !map.has(name)) map.set(name, color);
    });

    // 3) 개인 스케줄 데이터에 색/이름이 있는 경우도 보강 (옵션)
    //   memschedule가 배열이라면, 항목에 이름/색이 있으면 추가
    (Array.isArray(memschedule) ? memschedule : []).forEach((it) => {
      const name = it?.name || it?.member || it?.artist;
      const color = it?.color;
      if (name && color && !map.has(name)) map.set(name, color);
    });

    // 보기 좋게: 그룹을 맨 앞, 이후 멤버명 가나다/알파벳 순 정렬
    const entries = Array.from(map, ([label, color]) => ({ label, color }));
    const groupFirst = entries.findIndex(e => e.label === group?.group);
    if (groupFirst > 0) {
      const [g] = entries.splice(groupFirst, 1);
      entries.sort((a, b) => a.label.localeCompare(b.label, 'ko')); // 멤버 정렬
      entries.unshift(g);
      return entries;
    }
    return entries;
  }, [group, memschedule]);

  /* ===== 타입 범례 ===== */
  const typeLegend = [
    { code: "S", label: "Show / 공연·방송" },
    { code: "R", label: "Release / 발매" },
    { code: "A", label: "Anniv. / 기념일·생일" },
    { code: "E", label: "Event / 팬미팅·콘서트 등" },
    { code: "T", label: "Etc / 기타" },
  ];

  /* ===== 월간 ↔ 리스트 동기 & WeekPager 동작 ===== */
  const [monthAnchor, setMonthAnchor] = useState(new Date());
  const [listAnchor, setListAnchor] = useState(null);

  const gotoList = (date) => {
    const api = listRef.current?.getApi();
    if (!api) return;
    api.gotoDate(date);
    setListAnchor(new Date(date));
  };

  // 월간 이동 시: anchor 보관 + 리스트 이동(오늘이 보이는 범위면 오늘 주, 아니면 1주차)
  const onMonthDatesSet = () => {
    const anchorDate = monthRef.current?.getApi()?.getDate() ?? new Date();

    const y = anchorDate.getFullYear();
    const m = anchorDate.getMonth();
    const monthStart = new Date(y, m, 1);   // inclusive
    const monthEnd   = new Date(y, m + 1, 1); // exclusive
    setMonthRange({ start: monthStart, end: monthEnd });

    // WeekPager anchor도 이 달로
    setMonthAnchor(monthStart);

    // 오늘이 그 달이면 오늘로, 아니면 달 1일로 리스트 이동
    const today = new Date();
    const base = (today >= monthStart && today < monthEnd) ? today : monthStart;
    const api = listRef.current?.getApi();
    api?.gotoDate(base);
    setListAnchor(new Date(base));
  };

  return (
    <div ref={calendarRef} className={styles.Schedule}>
      {/* 달력 2열: 월간 + 리스트 */}
      <div className={styles.calGrid}>
        {/* 월간 */}
        <div className={styles.month}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            ref={monthRef}
            initialView="dayGridMonth"
            headerToolbar={{ left: "prev today", center: "title", right: "next" }}
            locale={koLocale}
            firstDay={0}          /* 일요일 시작 */
            fixedWeekCount={false}        // 4~6주 가변
            showNonCurrentDates={false}   // 이번 달 아닌 날짜 숨김
            dayMaxEvents={false}
            datesSet={onMonthDatesSet}
            events={[]}           /* 월간은 커스텀 도트만 그릴 거라 비움 */
            height="auto"
            viewDidMount={() => setTimeout(() => { /* 레이아웃 안정화용 */ }, 0)}
            dayCellDidMount={(arg) => {
              // ❶ 월간 그리드에서 이번 달(제목의 달) 구하기
              //    anchor는 현재 월 뷰가 가리키는 날짜(해당 달 안의 아무 날)라서 안전합니다.
              const anchor = monthRef.current?.getApi()?.getDate() ?? new Date();
              if (arg.el.classList.contains("fc-day-other") || arg.date.getMonth() !== anchor.getMonth()) return;

              // ❸ 중복 wrap 제거
              const frame = arg.el.querySelector('.fc-daygrid-day-frame');
              if (!frame) return;
              frame.style.position = 'relative';
              frame.querySelector('.fc-dots-wrap')?.remove();

              // ❹ ISO 날짜 문자열 비교
              const ymd = (d) => {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const da = String(d.getDate()).padStart(2, '0');
                return `${y}-${m}-${da}`;
              };
              const cellISO = ymd(arg.date);

              const dayEvents = allEvents.filter((ev) => {
                const s = ev.start;
                const e = ev.end || s;
                return s <= cellISO && cellISO <= e;
              });

              // ❺ 점 컨테이너
              const wrap = document.createElement('div');
              wrap.className = 'fc-dots-wrap';
              Object.assign(wrap.style, {
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                pointerEvents: 'none',
                zIndex: 2
              });

              const DOT_SIZE = 12;
              const MAX_DOTS = 8;

              dayEvents.slice(0, MAX_DOTS).forEach((ev) => {
                const dot = document.createElement('span');
                dot.className = 'fc-dot';
                const color = ev.color || ev.backgroundColor || '#00B6F0';
                dot.style.cssText = `
                  width:${DOT_SIZE}px;height:${DOT_SIZE}px;border-radius:50%;
                  display:inline-block;flex:0 0 ${DOT_SIZE}px;background:${color};
                  box-sizing:border-box;
                `;
                wrap.appendChild(dot);
              });

              frame.appendChild(wrap);
            }}
            dateClick={(info) => gotoList(info.date)}
          />
        </div>

        {/* 리스트(주간) + WeekPager */}
        <div className={styles.list}>
          <FullCalendar
            key={monthRange.start?.toISOString() || "list-init"}
            plugins={[listPlugin]}
            ref={listRef}
            initialView="listWeek"
            headerToolbar={false}
            locale={koNoAllDay}
            firstDay={0}
            listDayFormat={{ weekday: "short" }}
            listDaySideFormat={{ day: "2-digit" }}
            events={monthFilteredEvents}
            noEventsContent={() => (
              <div className={styles.noEventsBox}>일정이 없습니다</div>
            )}
            height="auto"
            timeZone="local"
            eventContent={({ event }) => {
              const type = event.extendedProps?.type;
              const wrap = document.createElement("div");
              wrap.className = styles.evRow;

              if (type) {
                const badge = document.createElement("span");
                badge.className = `${styles.badge} ${styles.badgeLg} ${styles["type" + type]}`;
                badge.textContent = type;
                wrap.appendChild(badge);
              }
              const title = document.createElement("span");
              title.className = styles.evTitle;
              title.textContent = event.title;
              wrap.appendChild(title);

              return { domNodes: [wrap] };
            }}
          />

          {monthAnchor && (
            <WeekPager
              key={monthAnchor?.toISOString() + "|" + (listAnchor?.toISOString?.() || "init")}
              monthAnchor={monthAnchor}
              currentDate={listAnchor}     // 초기엔 undefined여도 WeekPager가 1주차로 표시
              onGotoWeek={(date) => gotoList(date)}
            />
          )}
        </div>
      </div>

      {/* === 범례(달력 아래) === */}
      <div className={styles.legendWrap}>
        <div className={styles.legendBlock}>
          <div className={styles.legendTitle}>유형</div>
          <div className={styles.typeLegendRow}>
            {typeLegend.map((t) => (
              <div key={t.code} className={styles.typeLegendItem}>
                <span className={`${styles.badge} ${styles["type" + t.code]}`}>{t.code}</span>
                <span className={styles.legendText}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.legendBlock}>
          <div className={styles.legendTitle}>색상</div>
          <div className={styles.colorLegendGrid}>
            {colorLegend.map((c) => (
              <div key={c.label} className={styles.colorLegendItem}>
                <span className={styles.colorDot} style={{ background: c.color }} />
                <span className={styles.legendText}>{c.label}</span>
              </div>
            ))}
            {colorLegend.length === 0 && (
              <div className={styles.legendEmpty}>표시할 항목이 없어요</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}