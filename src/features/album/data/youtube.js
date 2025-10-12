export function extractYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      if (u.hostname === "youtu.be") return u.pathname.slice(1); // /VIDEO_ID
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2];
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2];
    }
  } catch (e) {}
  return null;
}

export function extractPlaylistId(url = "") {
  try {
    const u = new URL(url);
    // /watch?v=...&list=...  또는  /playlist?list=...
    const list = u.searchParams.get("list");
    if (list) return list;
  } catch (e) {}
  return null;
}

export function getKind(url = "") {
  if (extractPlaylistId(url)) return "playlist";
  if (extractYouTubeId(url)) return "video";
  return "external";
}

export function toEmbedUrlSmart(url = "") {
  const listId = extractPlaylistId(url);
  if (listId) {
    // 재생목록 임베드
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }
  const vid = extractYouTubeId(url);
  if (vid) {
    return `https://www.youtube.com/embed/${vid}?rel=0`;
  }
  return null;
}

export function toThumbnailSmart(url = "") {
  // 썸네일은 "영상 ID"가 있을 때만 안정적으로 만들 수 있어요.
  // 재생목록은 대표 썸네일 엔드포인트가 안정적이지 않아서 null 리턴 -> 배지형 폴백 UI 사용
  const vid = extractYouTubeId(url);
  if (vid) return `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
  return null;
}