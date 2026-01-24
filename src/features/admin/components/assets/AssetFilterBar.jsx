import styles from "@/features/admin/styles/Admin.module.css";

export default function AssetFilterBar({
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

  query,
  primary,
}) {
  return (
    <div className={styles.card} style={{ marginBottom: 12 }}>
      <div className={styles.row} style={{ gap: 8, flexWrap: "wrap" }}>
        <label>
          targetType
          <select
            className={styles.input}
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
          >
            <option value="GROUP">GROUP</option>
            <option value="MEMBER">MEMBER</option>
            <option value="UNIT">UNIT</option>
          </select>
        </label>

        {targetType !== "GROUP" && (
          <label>
            그룹
            <select
              className={styles.input}
              value={artistId ?? ""}
              onChange={(e) => {
                const next = Number(e.target.value);
                setArtistId(next);
                setTargetId(null);
              }}
              disabled={artistLoading}
            >
              {artistOptions.map((a) => (
                <option key={a.artistId} value={a.artistId}>
                  {a.groupName}
                </option>
              ))}
            </select>
          </label>
        )}

        <label>
          대상
          {targetType === "GROUP" ? (
            <select
              className={styles.input}
              value={targetId ?? ""}
              onChange={(e) => setTargetId(Number(e.target.value))}
              disabled={artistLoading}
            >
              {artistOptions.map((a) => (
                <option key={a.artistId} value={a.artistId}>
                  {a.groupName}
                </option>
              ))}
            </select>
          ) : (
            <select
              className={styles.input}
              value={targetId ?? ""}
              onChange={(e) => setTargetId(Number(e.target.value))}
              disabled={targetLoading || !artistId}
            >
              {targetType === "MEMBER" &&
                targetOptions.map((m) => (
                  <option key={m.memberPk} value={m.memberPk}>
                    {m.name}
                  </option>
                ))}

              {targetType === "UNIT" &&
                targetOptions.map((u) => (
                  <option key={u.unitId} value={u.unitId}>
                    {u.unitName}
                  </option>
                ))}
            </select>
          )}
        </label>

        <label>
          imageType
          <select
            className={styles.input}
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
          >
            {targetType === "MEMBER" ? (
              // MEMBER일 때는 PROFILE만 표시
              <option value="PROFILE">PROFILE</option>
            ) : (
              // 그 외(GROUP, UNIT)일 때는 모든 옵션 표시
              <>
                <option value="LOGO">LOGO</option>
                <option value="COVER">COVER</option>
                <option value="PROFILE">PROFILE</option>
              </>
            )}
          </select>
        </label>

        <div style={{ marginLeft: "auto" }}>
          {primary ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className={styles.badge}>대표</span>
              <img
                src={primary.publicUrl}
                alt="primary"
                style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }}
              />
              <span style={{ fontSize: 12 }}>ID: {primary.imageId}</span>
            </div>
          ) : (
            <span style={{ fontSize: 12, opacity: 0.7 }}>대표 이미지 없음</span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
        {query
          ? `조회: ${query.targetType} / targetId=${query.targetId} / ${query.imageType}`
          : "대상을 선택해줘"}
      </div>
    </div>
  );
}
