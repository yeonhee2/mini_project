import requestHandler from "@/api/requestHandler";

// 그룹(GROUP)
export const fetchArtistOptions = () =>
  requestHandler({
    method: "GET",
    url: "/api/admin/options/artists",
  });

// 멤버(MEMBER)
export const fetchMemberOptions = (artistId) =>
  requestHandler({
    method: "GET",
    url: "/api/admin/options/members",
    params: artistId ? { artistId } : {},
  });

// 유닛(UNIT)
export const fetchUnitOptions = (artistId) =>
  requestHandler({
    method: "GET",
    url: "/api/admin/options/units",
    params: artistId ? { artistId } : {},
  });