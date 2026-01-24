import { useMemo } from "react";
import styles from "../styles/CalendarShell.module.css";
import CalendarShell from "../components/calendar/CalendarShell";
import { normalizeEvents } from "../../../utill/calendar/normalizeEvents";

import annivers from "../data/anniversary";
import show from "../data/performancedate";
import albumlist from "../../album/data/albumlist";
import gpskd from "../data/groupschedule";
import memskd from "../data/memschedule";

export default function Schedule({ performance, group, album, schedule, memschedule }) {
  const events = useMemo(() => {
    const raw = [
      ...(annivers(group) || []),
      ...(show(performance) || []),
      ...(albumlist(album) || []),
      ...(gpskd(schedule) || []),
      ...(memskd(memschedule) || []),
    ];
    return normalizeEvents(raw);
  }, [performance, group, album, schedule, memschedule]);

  // 색상 범례
  const colorLegend = useMemo(() => {
    const result = [];
    const seen = new Set();

    const norm = (s) => (s || "").trim();

    // 1️⃣ 그룹 (항상 1개)
    const groupName = norm(group?.group || group?.groupName);
    const groupColor = group?.color;

    if (groupName && groupColor) {
      result.push({
        label: groupName,
        color: groupColor,
      });
      seen.add(`group:${groupName}`);
    }

    // 2️⃣ 멤버 (Artist DTO 기준)
    const members = Array.isArray(group?.member) ? group.member : [];
    members.forEach((m) => {
      const name = norm(m?.name);
      const color = m?.color || m?.memberColor;
      const key = `member:${name}`;

      if (!name || !color) return;
      if (seen.has(key)) return;

      seen.add(key);
      result.push({
        label: name,
        color,
      });
    });

    return result;
  }, [group]);

  const typeLegend = [
    { code: "S", label: "Show / 공연·방송" },
    { code: "R", label: "Release / 발매" },
    { code: "A", label: "Anniv. / 기념일·생일" },
    { code: "E", label: "Event / 팬미팅·콘서트 등" },
    { code: "T", label: "Etc / 기타" },
  ];

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
