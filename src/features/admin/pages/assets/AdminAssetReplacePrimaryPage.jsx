import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AdminCrudFormPage from "@/features/admin/components/crud/AdminCrudFormPage";
import styles from "@/features/admin/styles/Admin.module.css";

import { replacePrimaryAsset } from "@/features/admin/api/assetApi";
import useAssetSelection from "@/features/admin/hooks/useAssetSelection";
import AssetTargetFields from "@/features/admin/components/assets/AssetTargetFields";

export default function AdminAssetReplacePrimaryPage() {
  const { state } = useLocation();

  const init = useMemo(
    () => ({
      targetType: state?.targetType || "GROUP",
      targetId: state?.targetId || null,
      imageType: state?.imageType || "LOGO",
      artistId: state?.artistId || null,
    }),
    [state]
  );

  const select = useAssetSelection({
    initialTargetType: init.targetType,
    initialImageType: init.imageType,
    initialArtistId: init.artistId,
    initialTargetId: init.targetId,
    excludeGroupNamesLower: ["idol-note"],
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const backTo = "/admin/assets";

  // target 바꾸면 파일/에러 리셋(선택 로직은 훅이 담당)
  useEffect(() => {
    setError("");
    setFile(null);
  }, [select.targetType, select.artistId, select.targetId, select.imageType]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) return setError("대표로 교체할 파일을 선택해줘!");
    if (!select.targetId) return setError("대상을 선택해줘!");

    setSaving(true);
    const res = await replacePrimaryAsset({
      file,
      targetType: select.targetType,
      targetId: select.targetId,
      imageType: select.imageType,
    });

    if (!res?.ok) setError(res?.message || "대표 교체 실패");
    else window.location.href = backTo;

    setSaving(false);
  };

  return (
    <AdminCrudFormPage
      title="대표 이미지 교체"
      desc="기존 대표는 내려가고(valid_to 찍힘), 새 파일이 대표로 저장됩니다."
      backTo={backTo}
      onSubmit={onSubmit}
      submitText={saving ? "교체 중..." : "대표 교체"}
      cancelText="취소"
    >
      <div className={styles.card}>
        <AssetTargetFields {...select} />

        <div className={styles.formRow}>
          <label>새 파일</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      </div>
    </AdminCrudFormPage>
  );
}

