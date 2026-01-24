import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Admin.module.css";

export default function ImageUploadField({
  label = "이미지",
  file,
  valueUrl,            // 기존 이미지 URL (수정 화면에서)
  onChange,            // (file|null) => void
  accept = "image/*",
  note,
}) {
  const [preview, setPreview] = useState(null);

  const objectUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    setPreview(objectUrl || valueUrl || null);
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl, valueUrl]);

  return (
    <div className={styles.uploadField}>
      <div className={styles.uploadHead}>
        <div className={styles.uploadLabel}>{label}</div>
        {note ? <div className={styles.uploadNote}>{note}</div> : null}
      </div>

      <div className={styles.uploadBody}>
        <div className={styles.uploadPreview}>
          {preview ? <img src={preview} alt="preview" /> : <div className={styles.uploadPlaceholder}>미리보기</div>}
        </div>

        <div className={styles.uploadActions}>
          <input
            className={styles.fileInput}
            type="file"
            accept={accept}
            onChange={(e) => onChange?.(e.target.files?.[0] || null)}
          />
          {(file || valueUrl) ? (
            <button type="button" className={styles.btn} onClick={() => onChange?.(null)}>
              제거
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
