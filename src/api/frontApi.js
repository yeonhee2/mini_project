import requestHandler from "./requestHandler";

const BASE_URL = "/api/front";

export const frontApi = {
  // ===== 전체 목록 =====
  getArtists: () =>
    requestHandler({ method: "get", url: `${BASE_URL}/artists` }),

  getAlbums: () =>
    requestHandler({ method: "get", url: `${BASE_URL}/albums` }),

  getConcerts: () =>
    requestHandler({ method: "get", url: `${BASE_URL}/concerts` }),

  getPlaylists: () =>
    requestHandler({ method: "get", url: `${BASE_URL}/playlists` }),

  getGroupSchedules: () =>
    requestHandler({ method: "get", url: `${BASE_URL}/schedules/group` }),

  getMemberSchedules: () =>
    requestHandler({ method: "get", url: `${BASE_URL}/schedules/member` }),

  // ===== ✅ 그룹 1개 상세 (추가) =====
  getAlbum: (group) =>
    requestHandler({
      method: "get",
      url: `${BASE_URL}/albums/${encodeURIComponent(group)}`,
    }),

  getConcert: (group) =>
    requestHandler({
      method: "get",
      url: `${BASE_URL}/concerts/${encodeURIComponent(group)}`,
    }),

  getGroupSchedule: (group) =>
    requestHandler({
      method: "get",
      url: `${BASE_URL}/schedules/group/${encodeURIComponent(group)}`,
    }),

  getMemberSchedule: (group) =>
    requestHandler({
      method: "get",
      url: `${BASE_URL}/schedules/member/${encodeURIComponent(group)}`,
    }),
  
  // 그룹 최신 앨범 상세 + 활동내역
  getLatestAlbumDetail: (group) =>
    requestHandler({
      method: "get",
      url: `${BASE_URL}/albums/${encodeURIComponent(group)}/detail`,
    }),

  // 특정 앨범 상세 + 활동내역
  getAlbumDetailByAlbumId: (group, albumId) =>
    requestHandler({
      method: "get",
      url: `${BASE_URL}/albums/${encodeURIComponent(group)}/detail/${albumId}`,
    }),
};