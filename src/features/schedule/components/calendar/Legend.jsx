export default function Legend({ styles, typeLegend, colorLegend }) {
  return (
    <div className={styles.legendWrap}>
      <div className={styles.legendBlock}>
        <div className={styles.legendTitle}>유형</div>
        <div className={styles.typeLegendRow}>
          {typeLegend.map((t) => (
            <div key={t.code} className={styles.typeLegendItem}>
              <span className={`${styles.badge} ${styles["type" + t.code]}`}>{t.code}</span>
              <span className={styles.legendText}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legendBlock}>
        <div className={styles.legendTitle}>색상</div>
        <div className={styles.colorLegendGrid}>
          {colorLegend.map((c) => (
            <div key={c.label} className={styles.colorLegendItem}>
              <span className={styles.colorDot} style={{ background: c.color }} aria-label={c.label} />
              <span className={styles.legendText}>{c.label}</span>
            </div>
          ))}
          {colorLegend.length === 0 && (
            <div className={styles.legendEmpty}>표시할 항목이 없어요</div>
          )}
        </div>
      </div>
    </div>
  );
}
