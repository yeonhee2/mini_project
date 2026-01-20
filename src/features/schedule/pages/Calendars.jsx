import { useMemo } from "react";
import styles from "../styles/CalendarShell.module.css";

import CalendarShell from "../components/calendar/CalendarShell";
import { normalizeEvents } from "../../../utill/calendar/normalizeEvents";

import data from "../../../utill/date.js";
import albums from "../../../utill/albumdata.js";
import concerts from "../../../utill/concertdata.js";

export default function Calendars({ artist, album, concert }) {
  // 메인 페이지용 이벤트 구성
  const events = useMemo(() => {
    const raw = [
      ...(data(artist) || []),
      ...(albums(album) || []),
      ...(concerts(concert) || []),
    ];
    return normalizeEvents(raw);
  }, [artist, album, concert]);

  // 색상 범례(지금 너가 쓰던 로직 유지)
  const colorLegend = useMemo(() => {
    const map = new Map();

    (artist || []).forEach((a) => {
      if (a?.group && a?.color) map.set(a.group, a.color);
    });

    (concert || []).forEach((c) => {
      if (Array.isArray(c.concertdate)) {
        c.concertdate.forEach((cd) => {
          const key = cd.artistname || c.group;
          if (key && cd.color) map.set(key, cd.color);
        });
      }
    });

    (album || []).forEach((al) => {
      (al.music || []).forEach((m) => {
        const key = m.groupsolo || al.group || m.albumname;
        if (key && m.color && !map.has(key)) map.set(key, m.color);
      });
    });

    return Array.from(map, ([label, color]) => ({ label, color }));
  }, [artist, album, concert]);

  const typeLegend = [
    { code: "S", label: "Show / 공연·방송" },
    { code: "R", label: "Release / 발매" },
    { code: "A", label: "Anniv. / 기념일·생일" },
    { code: "E", label: "Event / 팬미팅·콘서트 등" },
    { code: "T", label: "Etc / 기타" },
  ];

  // 메인 페이지 테마(기존 #00B6F0 유지)
  const theme = {
    headerBg: "#00B6F0",
    headerText: "#1A1A1A",
    buttonBg: "#00B6F0",
    buttonText: "#1A1A1A",
  };

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
