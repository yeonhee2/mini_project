import { useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

export default function MonthCalendar({
  styles,
  monthRef,
  monthWrapRef,
  dotIndex,
  theme,
  onMonthDatesSet,
  onDateClick,
}) {
  const clearAllDots = useCallback(() => {
    const root = monthWrapRef.current;
    if (!root) return;
    root.querySelectorAll(".fc-dots-wrap").forEach((el) => el.remove());
  }, [monthWrapRef]);

  const renderAllDots = useCallback(
    (calendarApi) => {
      const root = monthWrapRef.current;
      if (!root || !calendarApi) return;

      // 1) 기존 도트 싹 제거(잔상 제거)
      clearAllDots();

      // 2) 현재 보고 있는 달 범위
      const active = calendarApi.getDate(); // 현재 달 대표 날짜
      const ms = new Date(active.getFullYear(), active.getMonth(), 1);
      const me = new Date(active.getFullYear(), active.getMonth() + 1, 1);

      // 3) 보이는 모든 day cell을 훑으면서 data-date로 도트 그리기
      const cells = root.querySelectorAll(".fc-daygrid-day[data-date]");
      cells.forEach((cell) => {
        // FullCalendar가 각 셀에 넣어주는 ISO
        const cellISO = cell.getAttribute("data-date"); // "YYYY-MM-DD"
        if (!cellISO) return;

        // 날짜 객체로 바꿔서 현재 달 범위 밖이면 skip
        const [yy, mm, dd] = cellISO.split("-").map(Number);
        const cellDate = new Date(yy, mm - 1, dd);
        if (cellDate < ms || cellDate >= me) return;

        const dayEvents = dotIndex?.get(cellISO) || [];
        if (!dayEvents.length) return;

        const frame = cell.querySelector(".fc-daygrid-day-frame");
        if (!frame) return;

        frame.style.position = "relative";

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
          zIndex: 2,
        });

        const DOT_SIZE = 12;
        const MAX_DOTS = 8;

        dayEvents.slice(0, MAX_DOTS).forEach((ev) => {
          const dot = document.createElement("span");
          const color =
            ev.color || ev.backgroundColor || theme?.buttonBg || "#00B6F0";
          dot.style.cssText = `
            width:${DOT_SIZE}px;height:${DOT_SIZE}px;border-radius:50%;
            display:inline-block;flex:0 0 ${DOT_SIZE}px;background:${color};
            box-sizing:border-box;
          `;
          wrap.appendChild(dot);
        });

        frame.appendChild(wrap);
      });
    },
    [monthWrapRef, dotIndex, theme, clearAllDots]
  );

  // 달 이동/prev/next/today 할 때마다 “전체 다시 그리기”
  const handleDatesSet = useCallback(
    (arg) => {
      onMonthDatesSet?.(arg);

      const api = monthRef.current?.getApi();
      // view 갱신 이후 그리도록 0ms로 안전하게
      setTimeout(() => renderAllDots(api), 0);
    },
    [onMonthDatesSet, monthRef, renderAllDots]
  );

  // dotIndex(이벤트 데이터)가 바뀌면 현재 화면 다시 그리기
  useEffect(() => {
    const api = monthRef.current?.getApi();
    setTimeout(() => renderAllDots(api), 0);
  }, [dotIndex, monthRef, renderAllDots]);

  return (
    <div ref={monthWrapRef} className={styles.month}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        ref={monthRef}
        locale={koLocale}
        initialView="dayGridMonth"
        headerToolbar={{ left: "prev today", center: "title", right: "next" }}
        selectable
        timeZone="local"
        dayMaxEvents={false}
        fixedWeekCount={false}
        showNonCurrentDates={false}
        height="auto"
        contentHeight="auto"
        expandRows={true}
        firstDay={0}
        datesSet={handleDatesSet}
        dateClick={onDateClick}
        events={[]}
        views={{ dayGridMonth: { eventDisplay: "none", displayEventTime: false } }}
      />
    </div>
  );
}

