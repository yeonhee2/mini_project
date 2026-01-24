import { useEffect, useState } from "react";
import UseNavi from "@/hooks/UseNavi";

import AdminCrudFormPage from "@/features/admin/components/crud/AdminCrudFormPage";
import styles from "@/features/admin/styles/Admin.module.css";

import { uploadAsset } from "@/features/admin/api/assetApi";
import useAssetSelection from "@/features/admin/hooks/useAssetSelection";
import AssetTargetFields from "@/features/admin/components/assets/AssetTargetFields";

export default function AdminAssetUploadPage() {
  const { goTo } = UseNavi();

  const select = useAssetSelection({
    initialTargetType: "GROUP",
    initialImageType: "LOGO",
    excludeGroupNamesLower: ["idol-note"],
  });

  const [file, setFile] = useState(null);
  const [isPrimary, setIsPrimary] = useState(true);

  useEffect(() => {
    if (select.targetType === "MEMBER") {
      // 멤버일 때는 무조건 PROFILE로 강제 설정
      select.setImageType("PROFILE");
    } else if (select.targetType === "GROUP") {
      // 그룹일 때는 PROFILE이 아닌 LOGO를 기본값으로 (선택 사항)
      if (select.imageType === "PROFILE") select.setImageType("LOGO");
    }
  }, [select.targetType]); // targetType이 바뀔 때마다 실행

  // ✅ 추가: targetOptions(멤버 목록)가 로드되었을 때 첫 번째 항목 자동 선택
  // targetId가 1로 나오는 이유는 초기값이 null이거나 1로 고정되어 있어서 그렇습니다.
  useEffect(() => {
    if (select.targetType !== "GROUP" && select.targetOptions?.length > 0) {
      const firstId = select.targetType === "MEMBER" 
        ? select.targetOptions[0].memberPk 
        : select.targetOptions[0].unitId;
      
      // 현재 선택된 targetId가 목록에 없거나 null이면 첫 번째 요소로 세팅
      if (!select.targetId || !select.targetOptions.find(o => (o.memberPk || o.unitId) === select.targetId)) {
        select.setTargetId(firstId);
      }
    }
  }, [select.targetOptions, select.targetType]);
  

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("파일 선택해줘!");
    if (!select.targetId) return alert("대상을 선택해줘!");

    const res = await uploadAsset({
      file,
      targetType: select.targetType,
      targetId: select.targetId,
      imageType: select.imageType,
      isPrimary,
    });

    if (res?.ok) goTo("/admin/assets");
    else alert(res?.message || "업로드 실패");
  };

  return (
    <AdminCrudFormPage
      title="이미지 업로드"
      desc="그룹/멤버/유닛 선택 → 대상 자동 세팅"
      backTo="/admin/assets"
      onSubmit={onSubmit}
      submitText="업로드"
    >
      <div className={styles.card}>
        {/* 업로드는 GROUP일 때도 그룹 선택을 보여주는 게 UX가 좋아서 true */}
        <AssetTargetFields {...select} showGroupSelectorWhenGroup />

        <div className={styles.formRow}>
          <label>파일</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className={styles.formRow}>
          <label>
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
            />
            대표 이미지
          </label>
        </div>
      </div>
    </AdminCrudFormPage>
  );
}



