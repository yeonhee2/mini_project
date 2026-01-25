import { useMemo } from "react";
import styles from "../styles/CalendarShell.module.css";

import CalendarShell from "../components/calendar/CalendarShell";
import { normalizeEvents } from "../../../utill/calendar/normalizeEvents";

import data from "../../../utill/date.js";
import concerts from "../../../utill/concertdata.js";

export default function Calendars({ artist, album, concert, onReady }) {
  // 메인 이벤트: 데뷔/생일/기념일 + 콘서트 + 앨범발매
  const events = useMemo(() => {
    const raw = [
      ...(data(artist) || []),
      ...(concerts(concert) || []),
      ...(buildAlbumReleaseEvents(album) || []),
    ];
    const normalized = normalizeEvents(raw);
    
    // 이벤트 데이터가 구성되면 부모에게 알림
    if (normalized.length > 0) {
      onReady();
    }
    
    return normalized;
  }, [artist, album, concert, onReady]);

  // 메인 페이지 색상 범례: 그룹 + (콘서트에 등장한) 유닛
  const colorLegend = useMemo(() => {
    // 같은 label 중복 제거용
    const labelToColor = new Map();

    // 같은 color 중복 제거용 (같은 색이면 첫 label만 남김)
    const usedColors = new Set();

    const add = (label, color) => {
      const l = (label || "").trim();
      const c = (color || "").trim();
      if (!l || !c) return;

      // 같은 색이면 중복 제거 (원하면 이 줄 빼면 "라벨 중복만 제거"로 바뀜)
      if (usedColors.has(c)) return;

      if (!labelToColor.has(l)) {
        labelToColor.set(l, c);
        usedColors.add(c);
      }
    };

    // 1) 그룹 색상: artists에서
    (artist || []).forEach((g) => {
      add(g?.group || g?.groupName, g?.color);
    });

    // 2) 유닛 색상: concerts에서 (unit 콘서트는 artistname이 유닛명으로 내려오게 했었지)
    // concert: List<FrontConcertDto>
    // dto: { group, concertdate:[{artistname,color,...}] }
    (concert || []).forEach((cg) => {
      const list = Array.isArray(cg?.concertdate) ? cg.concertdate : [];
      list.forEach((it) => {
        // 유닛이면 it.artistname = "MISAMO" 형태로 내려오게 DTO에서 만들었음
        add(it?.artistname, it?.color);
      });
    });

    return Array.from(labelToColor, ([label, color]) => ({ label, color }));
  }, [artist, concert]);


  const typeLegend = [
    { code: "S", label: "Show / 공연·방송" },
    { code: "R", label: "Release / 발매" },
    { code: "A", label: "Anniv. / 기념일·생일" },
    { code: "E", label: "Event / 팬미팅·콘서트 등" },
    { code: "T", label: "Etc / 기타" },
  ];

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

/** 백에서 내려온 album 리스트를 "발매일 이벤트"로 변환 */
function buildAlbumReleaseEvents(albumDtoList) {
  const list = Array.isArray(albumDtoList) ? albumDtoList : [];
  const events = [];

  for (const g of list) {
    const group = g?.group;
    const music = Array.isArray(g?.music) ? g.music : [];
    for (const it of music) {
      if (!group || !it?.Releasedate || !it?.albumname) continue;
      events.push({
        title: `${it.subjectName} | ${it.albumname} 📀`,
        start: it.Releasedate,
        color: it.color,
        type: it.type || "R",
        extendedProps: { group },
      });
    }
  }
  return events;
}