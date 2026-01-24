import styles from "@/features/admin/styles/Admin.module.css";
import { labelOfType } from "@/features/admin/constants/activityConstants";

export default function FilterChips({ chip, set }) {
  const { groupId, albumId, type, q, gName, aName } = chip;
  const { setGroupId, setAlbumId, setType, setQ } = set;

  const typeLabel = type ? labelOfType(type) : "";

  return (
    <div className={styles.chipBar}>
      {gName ? (
        <span className={styles.chip}>
          그룹: {gName}
          <button type="button" className={styles.chipX} onClick={() => { setGroupId(""); setAlbumId(""); }}>
            ×
          </button>
        </span>
      ) : null}

      {aName ? (
        <span className={styles.chip}>
          앨범: {aName}
          <button type="button" className={styles.chipX} onClick={() => setAlbumId("")}>
            ×
          </button>
        </span>
      ) : null}

      {typeLabel ? (
        <span className={styles.chip}>
          타입: {typeLabel}
          <button type="button" className={styles.chipX} onClick={() => setType("")}>
            ×
          </button>
        </span>
      ) : null}

      {q.trim() ? (
        <span className={styles.chip}>
          검색: {q.trim()}
          <button type="button" className={styles.chipX} onClick={() => setQ("")}>
            ×
          </button>
        </span>
      ) : (
        <span className={styles.chipHint}>앨범명을 클릭하면 빠르게 필터할 수 있어요.</span>
      )}
    </div>
  );
}
