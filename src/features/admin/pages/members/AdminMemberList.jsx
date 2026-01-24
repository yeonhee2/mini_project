import { useMemo, useCallback } from "react";
import AdminCrudListPage from "@/features/admin/components/crud/AdminCrudListPage";
import { DUMMY_GROUPS, DUMMY_MEMBERS } from "@/features/admin/constants/dummyData";

export default function AdminMemberList() {
  const groupMap = useMemo(() => new Map(DUMMY_GROUPS.map((g) => [g.id, g.name])), []);

  const rows = useMemo(
    () =>
      DUMMY_MEMBERS.map((m) => ({
        ...m,
        groupName: groupMap.get(m.groupId) || `#${m.groupId}`,
      })),
    [groupMap]
  );

  const columns = useMemo(
    () => [
      { key: "groupName", header: "그룹" },
      { key: "name", header: "멤버명" },
      { key: "birthday", header: "생일" },
      { key: "status", header: "상태" },
    ],
    []
  );

  const matcher = useCallback((r, keyword) => {
    return (
      (r.name || "").toLowerCase().includes(keyword) ||
      (r.groupName || "").toLowerCase().includes(keyword)
    );
  }, []);

  const onDelete = useCallback((row) => console.log("delete member:", row.id), []);

  return (
    <AdminCrudListPage
      title="멤버 관리"
      desc="멤버 등록 / 수정 / 삭제"
      rows={rows}
      columns={columns}
      createTo="/admin/members/new"
      createText="+ 멤버 등록"
      editTo={(row) => `/admin/members/${row.id}/edit`}
      onDelete={onDelete}
      deleteConfirmMessage={(row) => `${row.name} 멤버를 삭제합니다.`}
      matcher={matcher}
      searchPlaceholder="멤버/그룹 검색"
      emptyText="멤버가 없습니다."
    />
  );
}
