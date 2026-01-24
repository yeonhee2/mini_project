import { useMemo } from "react";
import UseNavi from "@/hooks/UseNavi";

import AdminCrudListPage from "@/features/admin/components/crud/AdminCrudListPage";
import styles from "@/features/admin/styles/Admin.module.css";

import useAssetFilters from "@/features/admin/hooks/useAssetFilters";
import useAssetListData from "@/features/admin/hooks/useAssetListData";
import AssetFilterBar from "@/features/admin/components/assets/AssetFilterBar";

export default function AdminAssetListPage() {
  const { goTo } = UseNavi();

  const exclude = useMemo(() => ["idol-note"], []);

  const filters = useAssetFilters({
    initialTargetType: "GROUP",
    initialImageType: "LOGO",
    excludeGroupNamesLower: exclude,
  });

  const { rows, primary, onDelete, onSetPrimary } = useAssetListData(filters.query);

 const columns = useMemo(
    () => [
      { key: "imageId", header: "ID" },
      { key: "imageType", header: "Type" },
      { 
        key: "isPrimary", 
        header: "Primary", 
        render: (row) => row?.isPrimary ? (
          <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>✅ 대표</span>
        ) : (
          <span style={{ color: '#ccc' }}>-</span>
        )
      },
      { 
        key: "publicUrl", 
        header: "URL",
        render: (row) => {
          const url = row?.publicUrl || "-";
          if (url === "-") return "-";
          
          // ✅ URL이 너무 길면 앞부분만 보여주고 ... 처리 (말줄임)
          // 클릭 시 새 창에서 원본 이미지를 볼 수 있도록 링크를 거는 것이 실용적입니다.
          return (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              title={url} // 마우스 올리면 전체 URL 툴팁 표시
              style={{ 
                display: 'inline-block', 
                maxWidth: '200px', // 표시할 최대 너비
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '0.85rem'
              }}
            >
              {url}
            </a>
          );
        }
      },
      {
        key: "preview",
        header: "미리보기",
        render: (row) => {
          if (!row?.publicUrl) return <span style={{ color: '#ccc' }}>No Image</span>;
          return (
            <img 
              src={row.publicUrl} 
              alt="asset" 
              style={{ 
                width: "80px", // 이미지 사이즈 키움 (기존 50px -> 80px)
                height: "80px", 
                objectFit: "contain", // contain으로 하면 잘리지 않고 전체가 보입니다.
                borderRadius: "4px",
                border: "1px solid #eee",
                backgroundColor: "#f9f9f9",
                cursor: "zoom-in", // 돋보기 아이콘 표시
                transition: "transform 0.2s",
              }}
            />
          );
        }
      },
    ],
    []
  );

  const beforeTable = () => (
    <AssetFilterBar
      {...filters}
      primary={primary}
    />
  );

  const extraActions = () => (
    <>
      <button
        className={styles.btn}
        type="button"
        onClick={() => goTo("/admin/assets/upload", filters.query)}
        disabled={!filters.query}
      >
        + 업로드
      </button>
      <button
        className={styles.btn}
        type="button"
        onClick={() =>
          goTo("/admin/assets/replace-primary", { ...filters.query, artistId: filters.artistId })
        }
        disabled={!filters.query}
      >
        대표 교체
      </button>
    </>
  );

  const renderRowActions = (row, { handleAskDelete }) => (
    <>
      <button className={styles.btn} type="button" onClick={() => onSetPrimary(row)}>
        대표
      </button>
      <button
        className={`${styles.btn} ${styles.btnDanger}`}
        type="button"
        onClick={() => handleAskDelete(row)}
      >
        삭제
      </button>
    </>
  );

  return (
    <AdminCrudListPage
      title="에셋(이미지) 관리"
      desc="GROUP/MEMBER/UNIT 이미지 업로드/대표설정/삭제"
      rows={rows}
      columns={columns}
      createText="(기본 등록 버튼 숨김)"
      onCreate={() => {}}
      onDelete={onDelete}
      deleteConfirmTitle="삭제할까요?"
      deleteConfirmMessage={(row) => `삭제합니다: imageId=${row.imageId}`}
      emptyText="이미지가 없습니다."
      beforeTable={beforeTable}
      extraActions={extraActions}
      renderRowActions={renderRowActions}
      createTo="/admin/assets/upload"
      editTo={() => "/admin/assets/upload"}
    />
  );
}

