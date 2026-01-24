import styles from "@/features/admin/styles/Admin.module.css";
import { ACTIVITY_TYPES } from "@/features/admin/constants/activityConstants";

export default function ActivityFilterBar({
  groups,
  albumsByGroup,
  state,
  set,
}) {
  const { groupId, albumId, type, q } = state;
  const { setGroupId, setAlbumId, setType, setQ } = set;

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterItem}>
        <div className={styles.filterLabel}>그룹</div>
        <select
          className={styles.input}
          value={groupId}
          onChange={(e) => {
            setGroupId(e.target.value);
            setAlbumId("");
          }}
        >
          <option value="">전체</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <div className={styles.filterLabel}>앨범</div>
        <select
          className={styles.input}
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          disabled={!groupId}
          title={!groupId ? "먼저 그룹을 선택하세요" : ""}
        >
          <option value="">{groupId ? "전체" : "그룹 선택 필요"}</option>
          {albumsByGroup.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <div className={styles.filterLabel}>타입</div>
        <select className={styles.input} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">전체</option>
          {ACTIVITY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterItemGrow}>
        <div className={styles.filterLabel}>검색</div>
        <input
          className={styles.input}
          placeholder="제목/URL/앨범명 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
    </div>
  );
}

