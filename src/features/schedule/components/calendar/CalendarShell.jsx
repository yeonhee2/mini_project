import { useEffect, useMemo, useRef } from "react";
import { buildDotIndex } from "../../../../utill/calendar/buildDotIndex";
import { useCalendarSync } from "../hooks/useCalendarSync";
import MonthCalendar from "./MonthCalendar";
import WeekList from "./WeekList";
import Legend from "./Legend";

export default function CalendarShell({
  styles,
  events,
  colorLegend = [],
  typeLegend = [],
  theme,
  monthOnly = false,
}) {
  const calendarRef = useRef(null);
  const monthWrapRef = useRef(null);
  const listWrapRef = useRef(null);

  const {
    monthRef,
    listRef,
    monthAnchor,
    monthRange,
    listBase,
    listAnchor,
    monthFilteredEvents,
    goListTo,
    onMonthDatesSet,
    onListDatesSet,
    gotoWeek,
  } = useCalendarSync({ events });

  const dotIndex = useMemo(
    () => buildDotIndex(Array.isArray(events) ? events : []),
    [events]
  );

  // 테마 적용
  useEffect(() => {
    if (!theme) return;
    const root = calendarRef.current;
    if (!root) return;

    const headerEl = root.querySelector(".fc-header-toolbar");
    if (headerEl && theme.headerBg) {
      headerEl.style.backgroundColor = theme.headerBg;
      headerEl.style.color = theme.headerText || "";
    }

    const buttons = root.querySelectorAll(".fc-button");
    buttons?.forEach((btn) => {
      if (theme.buttonBg) {
        btn.style.backgroundColor = theme.buttonBg;
        btn.style.borderColor = theme.buttonBg;
      }
      if (theme.buttonText) btn.style.color = theme.buttonText;
    });
  }, [theme]);

  // 높이 싱크(기존 로직 유지)
  useEffect(() => {
    const m = monthWrapRef.current;
    const l = listWrapRef.current;
    if (!m || !l) return;

    const sync = () => {
      const h = m.clientHeight || 0;
      l.style.height = `${h}px`;
    };

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
  }, []);

  return (
    <section className={styles.CalendarSection}>
      <div ref={calendarRef} className={styles.Calendars}>
        <MonthCalendar
          styles={styles}
          monthRef={monthRef}
          monthWrapRef={monthWrapRef}
          dotIndex={dotIndex}
          monthRange={monthRange}
          theme={theme}
          onMonthDatesSet={onMonthDatesSet}
          onDateClick={(info) => goListTo(info.date)}
        />

        {!monthOnly && (
          <WeekList
            styles={styles}
            listRef={listRef}
            listWrapRef={listWrapRef}
            monthAnchor={monthAnchor}
            listAnchor={listAnchor}
            listBase={listBase}
            monthRange={monthRange}
            monthFilteredEvents={monthFilteredEvents}
            onListDatesSet={onListDatesSet}
            onGotoWeek={gotoWeek}
          />
        )}

        <Legend styles={styles} typeLegend={typeLegend} colorLegend={colorLegend} />
      </div>
    </section>
  );
}
