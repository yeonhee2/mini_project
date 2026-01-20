import { useCallback, useMemo, useRef, useState } from "react";
import { filterMonthEvents } from "../../../../utill/calendar/filterMonthEvents";
import { weekStartSunday } from "../../../../utill/calendar/week";

export function useCalendarSync({ events }) {
  const monthRef = useRef(null);
  const listRef = useRef(null);
  const skipOnceRef = useRef(false);

  const [monthAnchor, setMonthAnchor] = useState(new Date());
  const [monthRange, setMonthRange] = useState({ start: null, end: null });
  const [listBase, setListBase] = useState(null);
  const [listAnchor, setListAnchor] = useState(null);

  const monthFilteredEvents = useMemo(() => {
    if (!monthRange.start || !monthRange.end) return [];
    return filterMonthEvents(events, monthRange.start, monthRange.end);
  }, [events, monthRange]);

  // 월간 -> 리스트 이동
  const goListTo = useCallback((date) => {
    const api = listRef.current?.getApi();
    if (!api) return;
    api.gotoDate(date);
    setListAnchor(new Date(date));
    skipOnceRef.current = true;
  }, []);

  // 월 이동 시
  const onMonthDatesSet = useCallback((arg) => {
    // 현재 달을 "그리드 시작일"에서 안전하게 계산
    const gridStart = arg?.start ?? new Date();

    // 그리드 시작은 보통 '이전 달 말'이라 +10일로 현재 달 안으로 들어가게 함
    const mid = new Date(gridStart);
    mid.setDate(mid.getDate() + 10);

    const y = mid.getFullYear();
    const m = mid.getMonth();
    const monthStart = new Date(y, m, 1);
    const monthEnd = new Date(y, m + 1, 1);

    setMonthAnchor(monthStart);
    setMonthRange({ start: monthStart, end: monthEnd });

    const today = new Date();

    const firstEventDate =
      (Array.isArray(events) ? events : [])
        .map((ev) => new Date(ev.start))
        .filter((d) => !Number.isNaN(d.getTime()))
        .filter((d) => d >= monthStart && d < monthEnd)
        .sort((a, b) => a - b)[0] || null;

    const base =
      today >= monthStart && today < monthEnd ? today : (firstEventDate || monthStart);

    const ws = weekStartSunday(base);
    setListBase(ws);

    const listApi = listRef.current?.getApi();
    listApi?.gotoDate(ws);

    setListAnchor(ws);
    skipOnceRef.current = true;
  }, [events]);

  // 리스트가 빈 주면 자동 점프
  const onListDatesSet = useCallback(() => {
    const api = listRef.current?.getApi();
    if (!api) return;

    if (skipOnceRef.current) {
      skipOnceRef.current = false;
      return;
    }

    setTimeout(() => {
      const viewStart = api.view.currentStart;
      const viewEnd = api.view.currentEnd;

      const hasThisWeek = monthFilteredEvents.some((ev) => {
        const s = new Date(ev.start);
        const e = new Date(ev.end || ev.start);
        return s < viewEnd && e >= viewStart;
      });

      if (!hasThisWeek) {
        const monthDates = monthFilteredEvents
          .map((ev) => new Date(ev.start))
          .sort((a, b) => a - b);

        const next = monthDates.find((d) => d >= viewEnd) || monthDates[0];
        if (next) {
          const ws = weekStartSunday(next);
          api.gotoDate(ws);
          setListAnchor(ws);
          skipOnceRef.current = true;
          return;
        }
      }

      setListAnchor(weekStartSunday(viewStart));
    }, 0);
  }, [monthFilteredEvents]);

  const gotoWeek = useCallback((date) => {
    const ws = weekStartSunday(date);
    listRef.current?.getApi()?.gotoDate(ws);
    setListAnchor(ws);
    skipOnceRef.current = true;
  }, []);

  return {
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
  };
}
