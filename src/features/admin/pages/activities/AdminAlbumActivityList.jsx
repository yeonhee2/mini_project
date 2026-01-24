import { useMemo, useCallback } from "react";
import AdminCrudListPage from "@/features/admin/components/crud/AdminCrudListPage";

import ActivityFilterBar from "@/features/admin/components/ActivityFilterBar";
import FilterChips from "@/features/admin/components/FilterChips";
import UseNavi from "@/hooks/UseNavi";
import styles from "@/features/admin/styles/Admin.module.css";
import {
  DUMMY_GROUPS,
  DUMMY_ALBUMS,
  DUMMY_ACTIVITIES,
  labelOfType,
} from "@/features/admin/constants/activityConstants";

import useActivityFilters from "@/features/admin/hooks/useActivityFilters";

const buildColumns = ({ albumMap, groupMap, applyAlbumFilter }) => [
  { key: "date", header: "날짜" },
  {
    key: "album",
    header: "앨범",
    render: (r) => {
      const album = albumMap.get(r.albumId);
      const group = album ? groupMap.get(album.groupId) : null;

      return (
        <button
          type="button"
          className={styles.linkBtn}
          onClick={() => applyAlbumFilter(r.albumId)}
          title="클릭하면 이 앨범으로 필터됩니다"
        >
          {album?.name || `#${r.albumId}`}
          <span className={styles.muted}>{group?.name ? ` · ${group.name}` : ""}</span>
        </button>
      );
    },
  },
  { key: "type", header: "타입", render: (r) => labelOfType(r.type) },
  { key: "title", header: "제목" },
  {
    key: "url",
    header: "URL",
    render: (r) => (
      <a href={r.url} target="_blank" rel="noreferrer">
        열기
      </a>
    ),
  },
  { key: "visible", header: "노출", render: (r) => (r.visible ? "ON" : "OFF") },
];

export default function AdminAlbumActivityList() {
  const { state, set, derived, actions } = useActivityFilters({
    groups: DUMMY_GROUPS,
    albums: DUMMY_ALBUMS,
    activities: DUMMY_ACTIVITIES,
  });

  const { albumId } = state;
  const { groupMap, albumMap, albumsByGroup, filteredRows, chip } = derived;
  const { applyAlbumFilter, resetAll } = actions;
  const { goTo } = UseNavi();

  const onDelete = useCallback((row) => {
    console.log("delete activity:", row.id);
  }, []);

  const columns = useMemo(
    () => buildColumns({ albumMap, groupMap, applyAlbumFilter }),
    [albumMap, groupMap, applyAlbumFilter]
  );

  return (
    <AdminCrudListPage
      title="앨범 활동 관리"
      desc="앨범별 활동 등록/수정/삭제"
      rows={filteredRows}
      columns={columns}
      createTo="/admin/activities/new"
      onCreate={() =>
        goTo("/admin/activities/new", {
          state: albumId ? { albumId: Number(albumId) } : {},
        })
      }
      createText="+ 활동 등록"
      editTo={(row) => `/admin/activities/${row.id}/edit`}
      onDelete={onDelete}
      deleteConfirmMessage={(row) => `활동을 삭제합니다: ${row.title}`}
      emptyText="조건에 맞는 활동이 없습니다."

      // 헤더에 “전체 초기화” 버튼 추가
      extraActions={() => (
        <button className={styles.btn} onClick={resetAll} type="button">
          전체 초기화
        </button>
      )}

      // 테이블 위에 칩/필터바 삽입
      beforeTable={() => (
        <>
          <FilterChips chip={chip} set={set} />
          <ActivityFilterBar
            groups={DUMMY_GROUPS}
            albumsByGroup={albumsByGroup}
            state={state}
            set={set}
          />
        </>
      )}

      // create 시 albumId state 넘기는 커스터마이징
      // (템플릿 createTo는 string이라 state를 못 싣기 때문에 renderRowActions 대신 create 커스텀 필요)
    />
  );
}





