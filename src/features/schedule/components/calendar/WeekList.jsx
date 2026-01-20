import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import WeekPager from "./WeekPager";

export default function WeekList({
  styles,
  listRef,
  listWrapRef,
  monthAnchor,
  listAnchor,
  listBase,
  monthRange,
  monthFilteredEvents,
  onListDatesSet,
  onGotoWeek,
}) {
  const koNoAllDay = useMemo(() => ({ ...koLocale, allDayText: "" }), []);

  return (
    <div ref={listWrapRef} className={styles.list}>
      <FullCalendar
        plugins={[listPlugin]}
        ref={listRef}
        locale={koNoAllDay}
        initialView="listWeek"
        initialDate={listBase || monthRange.start || new Date()}
        headerToolbar={false}
        height="100%"
        firstDay={0}
        noEventsContent={<div className={styles.noEventsBox}>일정이 없습니다</div>}
        timeZone="local"
        listDayFormat={{ weekday: "short" }}
        listDaySideFormat={{ day: "2-digit" }}
        events={monthFilteredEvents}
        datesSet={onListDatesSet}
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

      {monthAnchor && listAnchor && (
        <WeekPager
          styles={styles}
          monthAnchor={monthAnchor}
          currentDate={listAnchor}
          onGotoWeek={onGotoWeek}
        />
      )}
    </div>
  );
}
