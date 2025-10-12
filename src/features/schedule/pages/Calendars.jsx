import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "../styles/Calendars.module.css";
import data from "../../../utill/date.js";
import albums from "../../../utill/albumdata.js";
import concerts from "../../../utill/concertdata.js";
import WeekPager from "../components/WeekPager.jsx";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

export default function Calendars({ artist, album, concert }) {
  const calendarRef = useRef(null);
  const monthRef = useRef(null);
  const listRef = useRef(null);
  const isMobile = useIsMobile();
  const [listAnchor, setListAnchor] = useState(null);
  const monthWrapRef = useRef(null);
  const listWrapRef  = useRef(null);
  const koNoAllDay = useMemo(() => ({ ...koLocale, allDayText: "" }), []);
  const [monthRange, setMonthRange] = useState({ start: null, end: null });
  
  // 한 곳에서 이벤트 합치기
  const allEvents = useMemo(() => {
    const ymdLocal = (d) => {
      const dt = d instanceof Date ? d : new Date(d);
      if (Number.isNaN(dt.getTime())) return null;
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      const da = String(dt.getDate()).padStart(2, "0");
      return `${y}-${m}-${da}`;          // ← 로컬 기준
    };
    const normalize = (val) => {
      if (!val) return null;
      if (typeof val === "string") {
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val; // 이미 YYYY-MM-DD
        return val.split("T")[0];                        // '2025-10-11T..' → '2025-10-11'
      }
      return ymdLocal(val);                              // Date 객체
    };

    const merged = [...data(artist), ...albums(album), ...concerts(concert)]
      .map((ev) => {
        const start = normalize(ev.start ?? ev.date ?? ev.startDate ?? ev.when);
        const end   = normalize(ev.end ?? ev.endDate ?? null);
        return {
          ...ev,
          title: (ev.title || "").replace(/\s+/g, " ").trim(),
          start,
          ...(end ? { end } : {}),
          allDay: ev.allDay ?? true,
          extendedProps: { ...(ev.extendedProps || {}), type: ev.type },
        };
      })
      .filter((ev) => !!ev.start);

    // 중복 제거(선택)
    const seen = new Set();
    const uniq = [];
    for (const ev of merged) {
      const key = `${ev.title}|${ev.extendedProps?.type ?? ""}|${ev.start}|${ev.end ?? ""}`;
      if (!seen.has(key)) { seen.add(key); uniq.push(ev); }
    }
    return uniq;
  }, [artist, album, concert]);

  const monthFilteredEvents = useMemo(() => {
    if (!monthRange.start || !monthRange.end) return [];
    return allEvents.filter((ev) => {
      const s = new Date(ev.start);
      return s >= monthRange.start && s < monthRange.end;
    });
    // 달과 '겹치는' 모든 이벤트를 넣고 싶으면 아래로 교체
    // return allEvents.filter((ev) => {
    //   const s = new Date(ev.start);
    //   const e = new Date(ev.end || ev.start);
    //   return s < monthRange.end && e >= monthRange.start;
    // });
  }, [allEvents, monthRange]);

  // 월간 뷰의 anchor(해당 달 시작일) 보관 → WeekPager 계산에 사용
  const [monthAnchor, setMonthAnchor] = useState(new Date());

  useEffect(() => {
    // 헤더/버튼 톤(필요 없으면 제거 가능)
    const headerEl =
      calendarRef.current?.querySelector(".fc-header-toolbar");
    if (headerEl) {
      headerEl.style.backgroundColor = "#00B6F0";
      headerEl.style.color = "#1A1A1A";
    }
    const buttons = calendarRef.current?.querySelectorAll(".fc-button");
    buttons?.forEach((btn) => {
      btn.style.backgroundColor = "#00B6F0";
      btn.style.borderColor = "#00B6F0";
      btn.style.color = "#1A1A1A";
    });
  }, []);

  /** 리스트를 특정 날짜가 포함된 주로 이동 */
  const goListTo = (date) => {
    const api = listRef.current?.getApi();
    if (!api) return;
    api.gotoDate(date);
    setListAnchor(new Date(date));
  };

  // ✅ 월간(prev/next/today 등) 이동 시 호출
  const onMonthDatesSet = () => {
    // 제목에 표시된 '그 달'을 대표하는 날짜
    const anchorDate = monthRef.current?.getApi()?.getDate() ?? new Date();

    // WeekPager 계산용 anchor도 이걸 쓰기
    setMonthAnchor(anchorDate);

    // 현재 달 범위
    const y = anchorDate.getFullYear();
    const m = anchorDate.getMonth();
    const monthStart = new Date(y, m, 1);       // inclusive
    const monthEnd   = new Date(y, m + 1, 1);   // exclusive
    setMonthRange({ start: monthStart, end: monthEnd });

    // 리스트 시작은 오늘이 그 달이면 오늘, 아니면 그 달 1일
    const today = new Date();
    const base = (today >= monthStart && today < monthEnd) ? today : monthStart;
    const api = listRef.current?.getApi();
    api?.gotoDate(base);
    setListAnchor(new Date(base));
  };

  useEffect(() => {
    const m = monthWrapRef.current;
    const l = listWrapRef.current;
    if (!m || !l) return;

    const sync = () => {
      const h = m.clientHeight || 0;
      l.style.height = `${h}px`;
    };

    // ResizeObserver가 있으면 사용, 없으면 리사이즈 fallback
    const RO = window.ResizeObserver;
    let ro;
    if (RO) {
      ro = new RO(sync);
      ro.observe(m);
    } else {
      window.addEventListener("resize", sync);
    }
    sync();

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", sync);
    };
  }, [isMobile]);

  const colorLegend = useMemo(() => {
    const map = new Map();

    // artist: 그룹 색상
    (artist || []).forEach((a) => {
      if (a?.group && a?.color) map.set(a.group, a.color);
    });

    // concert: 그룹 색상
    (concert || []).forEach((c) => {
      if (c?.group && c?.color) map.set(c.group, c.color);
    });

    // album: 곡 주체(솔로/그룹) 색상
    (album || []).forEach((al) => {
      (al.music || []).forEach((m) => {
        const key = m.groupsolo || al.group || m.albumname;
        if (key && m.color && !map.has(key)) map.set(key, m.color);
      });
    });

    // [{label, color}] 배열로 변환
    return Array.from(map, ([label, color]) => ({ label, color }));
  }, [artist, album, concert]);

  const typeLegend = [
    { code: "S", label: "Show / 공연·방송" },
    { code: "R", label: "Release / 발매" },
    { code: "A", label: "Anniv. / 기념일·생일" },
    { code: "E", label: "Event / 팬미팅·콘서트 등" },
    { code: "T", label: "Etc / 기타" },
  ];


  return (
    <section className={styles.CalendarSection}>

      <div ref={calendarRef} className={styles.Calendars}>
        {/* 월간 */}
        <div ref={monthWrapRef} className={styles.month}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            ref={monthRef}
            locale={koLocale}
            initialView="dayGridMonth"
            headerToolbar={{ left: "prev today", center: "title", right: "next" }}
            editable
            selectable
            selectMirror
            timeZone="local"
            dayMaxEvents={false}
            fixedWeekCount={false}        // 6주 고정 해제 → 4~6주 가변
            showNonCurrentDates={false}   // 이번 달 아닌 날짜는 셀 자체를 숨김
            height={isMobile ? "auto" : "auto"}
            contentHeight="auto"
            expandRows={true}
            firstDay={0} 
            datesSet={onMonthDatesSet}
            dateClick={(info) => goListTo(info.date)} // 날짜 탭 → 해당 주로 리스트 이동
            events={[]}
            views={{
              dayGridMonth: { eventDisplay: 'none', displayEventTime: false }
            }}
            dayCellDidMount={(arg) => {
              const anchor = monthRef.current?.getApi()?.getDate() ?? new Date();
              if (arg.el.classList.contains("fc-day-other") || arg.date.getMonth() !== anchor.getMonth()) return;

              // 중복 wrap 제거
              const frame = arg.el.querySelector(".fc-daygrid-day-frame");
              if (!frame) return;
              frame.style.position = "relative";
              frame.querySelector(".fc-dots-wrap")?.remove();

              // ✅ 수정: ISO 날짜 문자열로만 정확히 비교 (타임존 영향 배제)
              const ymdLocal = (d) => {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, "0");
                const da = String(d.getDate()).padStart(2, "0");
                return `${y}-${m}-${da}`;
              };
              const cellISO = ymdLocal(arg.date);
              const dayEvents = allEvents.filter((ev) => {
                const s = ev.start;        // 이미 YYYY-MM-DD로 정규화되어 있음
                const e = ev.end || s;     // 종일 단일 이벤트
                // s <= cellISO <= e  (exclusive-end가 아니라 inclusive로 처리)
                return (s <= cellISO) && (cellISO <= e);
              });

              // 점 컨테이너 (날짜 숫자 아래에 세로로 쌓이게)
              const wrap = document.createElement("div");
              wrap.className = "fc-dots-wrap";
              Object.assign(wrap.style, {
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                pointerEvents: "none",
                zIndex: 2
              });

              // 점 크기/개수 여기서 조절
              const DOT_SIZE = 12;   // ← 점 크기
              const MAX_DOTS = 8;    // ← 최대 개수

              dayEvents.slice(0, MAX_DOTS).forEach((ev) => {
                const dot = document.createElement("span");
                dot.className = "fc-dot";
                const color = ev.color || ev.backgroundColor || "#00B6F0";
                const type  = ev.extendedProps?.type || ev.type;

                dot.style.cssText = `
                  width:${DOT_SIZE}px;height:${DOT_SIZE}px;border-radius:50%;
                  display:inline-block;flex:0 0 ${DOT_SIZE}px;background:${color};
                  box-sizing:border-box;
                `;

                wrap.appendChild(dot);
              });

              frame.appendChild(wrap); 
            }}
          />
        </div>

        {/* 리스트(이번 주만) + 주별 페이지네이션 */}
        <div ref={listWrapRef} className={styles.list}>
          <FullCalendar
            plugins={[listPlugin]}
            key={monthRange.start?.toISOString() || "list-init"}
            ref={listRef}
            locale={koNoAllDay}
            initialView="listWeek"
            headerToolbar={false}
            height="100%"
            firstDay={0} 
            noEventsContent={() => <div className={styles.noEventsBox}>일정이 없습니다</div>}
            timeZone="local"
            listDayFormat={{ weekday: "short" }} // WED
            listDaySideFormat={{ day: "2-digit" }} // 23
            events={monthFilteredEvents}
            eventContent={({ event }) => {
              const type = event.extendedProps?.type; // ETC 기본값 제거
              const wrap = document.createElement("div");
              wrap.className = styles.evRow;

              if (type) {
                const badge = document.createElement("span");
                badge.className = `${styles.badge} ${styles.badgeLg} ${styles["type"+type]}`;
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

          {/* 주별 페이지네이션 (해당 달 한정) */}
          {listAnchor && (
              <WeekPager
                key={monthAnchor?.toISOString() + '|' + listAnchor?.toISOString()} // 선택: 초기 깜빡임 방지
                monthAnchor={monthAnchor}
                onGotoWeek={(date) => {
                  const api = listRef.current?.getApi();
                  api?.gotoDate(date);
                  setListAnchor(new Date(date));
                }}
                currentDate={listAnchor}
              />
            )}
        </div>
        {/* === 범례 === */}
        <div className={styles.legendWrap}>
          <div className={styles.legendBlock}>
            <div className={styles.legendTitle}>유형</div>
            <div className={styles.typeLegendRow}>
              {typeLegend.map((t) => (
                <div key={t.code} className={styles.typeLegendItem}>
                  <span className={`${styles.badge} ${styles["type" + t.code]}`}>
                    {t.code}
                  </span>
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
                  <span
                    className={styles.colorDot}
                    style={{ background: c.color }}
                    aria-label={c.label}
                  />
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
    </section>
  );
}