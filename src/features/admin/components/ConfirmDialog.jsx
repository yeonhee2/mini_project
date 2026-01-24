import styles from "../styles/Admin.module.css";

export default function ConfirmDialog({
  open,
  title = "확인",
  message = "진행할까요?",
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onClose,
  danger = false,
}) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{title}</div>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalMessage}>{message}</p>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btn} onClick={onClose}>
            {cancelText}
          </button>
          <button
            className={[styles.btn, danger ? styles.btnDanger : styles.btnPrimary].join(" ")}
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
