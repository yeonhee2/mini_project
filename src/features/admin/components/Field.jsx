import styles from "@/features/admin/styles/Admin.module.css";

/**
 * Field: 라벨 + 컨트롤(입력/셀렉트 등) 래퍼
 *
 * 사용 예:
 * <Field label="제목">
 *   <input className={styles.input} ... />
 * </Field>
 */
export default function Field({ label, hint, required, children, className = "" }) {
  return (
    <label className={[styles.field, className].join(" ").trim()}>
      <span className={styles.fieldLabel}>
        {label}
        {required ? <em className={styles.requiredMark}>*</em> : null}
      </span>

      {children}

      {hint ? <small className={styles.fieldHint}>{hint}</small> : null}
    </label>
  );
}
