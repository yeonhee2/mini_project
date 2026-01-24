import { useMemo } from "react";
import styles from "@/features/admin/styles/Admin.module.css";

export default function AssetTargetFields({
  targetType,
  setTargetType,

  imageType,
  setImageType,

  artistId,
  setArtistId,

  targetId,
  setTargetId,

  artistOptions,
  artistLoading,

  targetOptions,
  targetLoading,

  showGroupSelectorWhenGroup = false, // 업로드에서 true
}) {
  const targetLabel = useMemo(() => {
    if (targetType === "GROUP") return "그룹";
    if (targetType === "MEMBER") return "멤버";
    if (targetType === "UNIT") return "유닛";
    return "대상";
  }, [targetType]);

  // ✅ GROUP + showGroupSelectorWhenGroup=true면 그룹선택만 보여서 “그룹 2개” 방지
  const groupOnlyMode = targetType === "GROUP" && showGroupSelectorWhenGroup;

  const showGroupSelector = targetType !== "GROUP" || showGroupSelectorWhenGroup;

  return (
    <>
      <div className={styles.formRow}>
        <label>targetType</label>
        <select
          className={styles.input}
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
        >
          <option value="GROUP">GROUP</option>
          <option value="MEMBER">MEMBER</option>
          <option value="UNIT">UNIT</option>
        </select>
      </div>

      {showGroupSelector && (
        <div className={styles.formRow}>
          <label>그룹 선택</label>
          <select
            className={styles.input}
            value={artistId ?? ""}
            onChange={(e) => {
              const next = Number(e.target.value);
              setArtistId(next);

              if (targetType !== "GROUP") setTargetId(null);
            }}
            disabled={artistLoading}
          >
            {artistOptions.length === 0 ? (
              <option value="">그룹 없음</option>
            ) : (
              artistOptions.map((a) => (
                <option key={a.artistId} value={a.artistId}>
                  {a.groupName}
                </option>
              ))
            )}
          </select>

          {artistLoading ? <small style={{ opacity: 0.7 }}>그룹 불러오는 중...</small> : null}
        </div>
      )}

      {/* ✅ groupOnlyMode면 대상 선택 row를 렌더링하지 않음 */}
      {!groupOnlyMode && (
        <div className={styles.formRow}>
          <label>{targetLabel} 선택</label>

          {targetType === "GROUP" ? (
            <select
              className={styles.input}
              value={targetId ?? ""}
              onChange={(e) => setTargetId(Number(e.target.value))}
              disabled={artistLoading}
            >
              {artistOptions.length === 0 ? (
                <option value="">그룹 없음</option>
              ) : (
                artistOptions.map((a) => (
                  <option key={a.artistId} value={a.artistId}>
                    {a.groupName}
                  </option>
                ))
              )}
            </select>
          ) : (
            <select
              className={styles.input}
              value={targetId ?? ""}
              onChange={(e) => setTargetId(Number(e.target.value))}
              disabled={targetLoading || !artistId}
            >
              {targetLoading && <option value="">불러오는 중...</option>}
              {!targetLoading && (targetOptions?.length ?? 0) === 0 && (
                <option value="">목록 없음</option>
              )}

              {targetType === "MEMBER" &&
                (targetOptions || []).map((m) => (
                  <option key={m.memberPk} value={m.memberPk}>
                    {m.name}
                  </option>
                ))}

              {targetType === "UNIT" &&
                (targetOptions || []).map((u) => (
                  <option key={u.unitId} value={u.unitId}>
                    {u.unitName}
                  </option>
                ))}
            </select>
          )}
        </div>
      )}

      <div className={styles.formRow}>
        <label>imageType</label>
        <select
          className={styles.input}
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
        >
          {targetType === "MEMBER" ? (
            // MEMBER일 때는 PROFILE만 선택 가능하게 제한
            <option value="PROFILE">PROFILE</option>
          ) : (
            // GROUP이나 UNIT일 때는 모든 옵션 제공
            <>
              <option value="LOGO">LOGO</option>
              <option value="COVER">COVER</option>
              <option value="PROFILE">PROFILE</option>
            </>
          )}
        </select>
      </div>
    </>
  );
}


