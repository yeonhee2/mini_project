import { useMemo, useState, useCallback } from "react";

export default function useActivityFilters({ groups, albums, activities }) {
  const [groupId, setGroupId] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [type, setType] = useState("");
  const [q, setQ] = useState("");

  // lookup maps (stable)
  const groupMap = useMemo(() => new Map(groups.map((g) => [g.id, g])), [groups]);
  const albumMap = useMemo(() => new Map(albums.map((a) => [a.id, a])), [albums]);

  const albumsByGroup = useMemo(() => {
    if (!groupId) return [];
    const gid = Number(groupId);
    return albums.filter((a) => a.groupId === gid);
  }, [albums, groupId]);

  const applyAlbumFilter = useCallback(
    (clickedAlbumId) => {
      const album = albumMap.get(clickedAlbumId);
      if (!album) return;
      setGroupId(String(album.groupId));
      setAlbumId(String(clickedAlbumId));
    },
    [albumMap]
  );

  const resetAll = useCallback(() => {
    setGroupId("");
    setAlbumId("");
    setType("");
    setQ("");
  }, []);

  const filteredRows = useMemo(() => {
    let rows = [...activities];

    if (albumId) {
      rows = rows.filter((r) => r.albumId === Number(albumId));
    } else if (groupId) {
      const gid = Number(groupId);
      const albumIds = new Set(albums.filter((a) => a.groupId === gid).map((a) => a.id));
      rows = rows.filter((r) => albumIds.has(r.albumId));
    }

    if (type) rows = rows.filter((r) => r.type === type);

    const keyword = q.trim().toLowerCase();
    if (keyword) {
      rows = rows.filter((r) => {
        const title = (r.title || "").toLowerCase();
        const url = (r.url || "").toLowerCase();
        const albumName = (albumMap.get(r.albumId)?.name || "").toLowerCase();
        return title.includes(keyword) || url.includes(keyword) || albumName.includes(keyword);
      });
    }

    rows.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return rows;
  }, [activities, albums, albumId, groupId, type, q, albumMap]);

  // 칩 표시용
  const chip = useMemo(() => {
    const gName = groupId ? groupMap.get(Number(groupId))?.name : "";
    const aName = albumId ? albumMap.get(Number(albumId))?.name : "";
    return { groupId, albumId, type, q, gName, aName };
  }, [groupId, albumId, type, q, groupMap, albumMap]);

  return {
    state: { groupId, albumId, type, q },
    set: { setGroupId, setAlbumId, setType, setQ },
    derived: { groupMap, albumMap, albumsByGroup, filteredRows, chip },
    actions: { applyAlbumFilter, resetAll },
  };
}
