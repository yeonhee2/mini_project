import { useMemo, useCallback } from "react";
import AdminCrudListPage from "@/features/admin/components/crud/AdminCrudListPage";

export default function AdminArtistList() {
  const rows = useMemo(
    () => [
      { id: 1, groupName: "DAY6", debutDate: "2015-09-07", status: "ACTIVE" },
      { id: 2, groupName: "TWICE", debutDate: "2015-10-20", status: "ACTIVE" },
      { id: 3, groupName: "Stray Kids", debutDate: "2018-03-25", status: "ACTIVE" },
      { id: 4, groupName: "ITZY", debutDate: "2019-02-12", status: "ACTIVE" },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { key: "groupName", header: "그룹명" },
      { key: "debutDate", header: "데뷔일" },
      { key: "status", header: "상태" },
    ],
    []
  );

  const matcher = useCallback(
    (r, keyword) => (r.groupName || "").toLowerCase().includes(keyword),
    []
  );

  const onDelete = useCallback((row) => {
    console.log("delete artist:", row.id);
  }, []);

  return (
    <AdminCrudListPage
      title="아티스트 관리"
      desc="그룹(아티스트) 등록 / 수정 / 삭제"
      rows={rows}
      columns={columns}
      createTo="/admin/artists/new"
      createText="+ 아티스트 등록"
      editTo={(row) => `/admin/artists/${row.id}/edit`}
      onDelete={onDelete}
      deleteConfirmMessage={(row) => `${row.groupName} 아티스트를 삭제합니다.`}
      matcher={matcher}
      searchPlaceholder="그룹명 검색"
      emptyText="아티스트가 없습니다."
    />
  );
}



