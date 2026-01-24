import { useMemo, useCallback } from "react";
import AdminCrudListPage from "@/features/admin/components/crud/AdminCrudListPage";
import { DUMMY_GROUPS, DUMMY_ALBUMS } from "@/features/admin/constants/dummyData";

export default function AdminAlbumList() {
  const groupMap = useMemo(() => new Map(DUMMY_GROUPS.map((g) => [g.id, g.name])), []);
  const rows = useMemo(
    () => DUMMY_ALBUMS.map((a) => ({ ...a, groupName: groupMap.get(a.groupId) || `#${a.groupId}` })),
    [groupMap]
  );

  const columns = useMemo(
    () => [
      { key: "groupName", header: "그룹" },
      { key: "name", header: "앨범명" },
      { key: "releaseDate", header: "발매일" },
      { key: "type", header: "형식" },
      { key: "status", header: "상태" },
    ],
    []
  );

  const matcher = useCallback((r, keyword) => {
    return (r.name || "").toLowerCase().includes(keyword) || (r.groupName || "").toLowerCase().includes(keyword);
  }, []);

  const onDelete = useCallback((row) => console.log("delete album:", row.id), []);

  return (
    <AdminCrudListPage
      title="앨범 관리"
      desc="앨범 등록 / 수정 / 삭제"
      rows={rows}
      columns={columns}
      createTo="/admin/albums/new"
      createText="+ 앨범 등록"
      editTo={(row) => `/admin/albums/${row.id}/edit`}
      onDelete={onDelete}
      deleteConfirmMessage={(row) => `${row.name} 앨범을 삭제합니다.`}
      matcher={matcher}
      searchPlaceholder="앨범/그룹 검색"
      emptyText="앨범이 없습니다."
    />
  );
}
