import UseNavi from "@/hooks/UseNavi";
import styles from "@/features/admin/styles/Admin.module.css";

/**
 * SaveCancelActions: 폼 하단 저장/취소 버튼 공통
 *
 * - submitText: 저장 버튼 텍스트
 * - cancelTo: 취소 시 이동 경로
 * - cancelReplace: replace 여부
 * - disabled: 저장 버튼 비활성
 */
export default function SaveCancelActions({
  submitText = "저장",
  cancelText = "취소",
  cancelTo = "/admin",
  cancelReplace = false,
  disabled = false,
}) {
  const { goTo } = UseNavi();

  return (
    <div className={styles.formActions}>
      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        type="submit"
        disabled={disabled}
      >
        {submitText}
      </button>

      <button
        className={styles.btn}
        type="button"
        onClick={() => goTo(cancelTo, { replace: !!cancelReplace })}
      >
        {cancelText}
      </button>
    </div>
  );
}
