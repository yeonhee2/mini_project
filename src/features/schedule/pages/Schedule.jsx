// src/features/schedule/pages/Schedule.jsx
import { useMemo } from "react";
import styles from "../styles/CalendarShell.module.css";

import CalendarShell from "../components/calendar/CalendarShell";
import { normalizeEvents } from "../../../utill/calendar/normalizeEvents";

/* === 데이터 소스 === */
import annivers from "../data/anniversary";
import show from "../data/performancedate";
import albumlist from "../../album/data/albumlist";
import gpskd from "../data/groupschedule";
import memskd from "../data/memschedule";

export default function Schedule({
  performance,
  group,
  album,
  schedule,
  memschedule,
}) {
  // 이벤트 만들기(정규화/중복제거는 normalizeEvents가 처리)
  const events = useMemo(() => {
    const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);

    const raw = [
      ...arr(annivers(group)),
      ...arr(show(performance)),
      ...arr(albumlist(album)),
      ...arr(gpskd(schedule)),
      ...arr(memskd(memschedule)),
    ];

    return normalizeEvents(raw);
  }, [performance, group, album, schedule, memschedule]);

  // 색상 범례
  const colorLegend = useMemo(() => {
    const map = new Map();
    const norm = (s) => (s || "").trim();

    // 1) 그룹(최우선)
    if (group?.group && group?.color) map.set(group.group, group.color);

    // 2) 멤버
    (group?.member || group?.members || []).forEach((m) => {
      const name = norm(m?.name || m?.nick || m?.label);
      const color = m?.color;
      if (name && color && !map.has(name)) map.set(name, color);
    });

    // 3) 개인 스케줄
    (Array.isArray(memschedule) ? memschedule : []).forEach((it) => {
      const name = norm(it?.name || it?.member || it?.artist);
      const color = it?.color;
      if (name && color && !map.has(name)) map.set(name, color);
    });

    // 4) performance(콘서트/공연 출연진 등)
    const perfList = Array.isArray(performance)
      ? performance
      : performance
      ? [performance]
      : [];
    perfList.forEach((p) => {
      const dates = Array.isArray(p?.concertdate)
        ? p.concertdate
        : Array.isArray(p?.sd)
        ? p.sd
        : [];
      dates.forEach((d) => {
        const name = norm(d?.artistname || d?.cast || p?.group);
        const color = d?.color || p?.color || group?.color;
        if (!name || !color) return;
        if (name === group?.group && map.has(name)) return; // 그룹 공식색 보존
        if (!map.has(name)) map.set(name, color);
      });
    });

    const entries = Array.from(map, ([label, color]) => ({ label, color }));

    // 그룹을 맨 위로 + 나머지 정렬
    const idx = entries.findIndex((e) => e.label === group?.group);
    if (idx > 0) {
      const [g] = entries.splice(idx, 1);
      entries.sort((a, b) =>
        a.label.localeCompare(b.label, "ko", { sensitivity: "base" })
      );
      entries.unshift(g);
    }
    return entries;
  }, [group, memschedule, performance]);

  const typeLegend = [
    { code: "S", label: "Show / 공연·방송" },
    { code: "R", label: "Release / 발매" },
    { code: "A", label: "Anniv. / 기념일·생일" },
    { code: "E", label: "Event / 팬미팅·콘서트 등" },
    { code: "T", label: "Etc / 기타" },
  ];

  // 그룹 테마
  const theme = useMemo(() => {
    if (!group?.color) return undefined;
    return {
      headerBg: group.color,
      headerText: group.fontcolor || "#fff",
      buttonBg: group.color,
      buttonText: group.fontcolor || "#fff",
    };
  }, [group]);

  return (
    <CalendarShell
      styles={styles}
      events={events}
      colorLegend={colorLegend}
      typeLegend={typeLegend}
      theme={theme}
      monthOnly={false}
    />
  );
}
