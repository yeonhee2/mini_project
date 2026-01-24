import { useCallback, useMemo } from "react";
import UseNavi from "@/hooks/UseNavi";

import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import DataTable from "@/features/admin/components/DataTable";
import ConfirmDialog from "@/features/admin/components/ConfirmDialog";

import useConfirm from "@/features/admin/hooks/useConfirm";
import useSearchFilter from "@/features/admin/hooks/useSearchFilter";
import styles from "@/features/admin/styles/Admin.module.css";

/**
 * AdminCrudListPage (확장형)
 * - extraActions: (ctx) => ReactNode   // 헤더 actions 뒤쪽에 추가
 * - beforeTable: (ctx) => ReactNode    // 테이블 위에 추가(필터/칩 등)
 * - renderRowActions: (row, ctx) => ReactNode // 행 액션 완전 커스텀
 */
export default function AdminCrudListPage({
  title,
  desc,

  rows,
  columns,

  createTo,
  onCreate,
  createText = "+ 등록",

  editTo,
  editText = "수정",

  onDelete,
  deleteText = "삭제",
  deleteConfirmTitle = "삭제할까요?",
  deleteConfirmMessage = (row) => `삭제합니다: ${row?.id}`,
  emptyText = "데이터가 없습니다.",

  // 검색 옵션
  searchPlaceholder,
  matcher,

  // 슬롯
  extraActions,
  beforeTable,

  // rowActions 커스텀(없으면 기본 수정/삭제)
  renderRowActions,
}) {
  const { goTo } = UseNavi();
  const { confirm, openConfirm, closeConfirm } = useConfirm();

  const withSearch = !!matcher;
  const { q, setQ, filtered } = useSearchFilter({
    rows,
    matcher: matcher || (() => true),
  });

  const tableRows = useMemo(() => (withSearch ? filtered : rows), [withSearch, filtered, rows]);

  const ctx = useMemo(
    () => ({
      goTo,
      q,
      setQ,
      openConfirm,
      closeConfirm,
    }),
    [goTo, q, setQ, openConfirm, closeConfirm]
  );

  const handleCreate = useCallback(() => {
    if (onCreate) return onCreate(ctx);  // onCreate가 있으면 그거 실행
    goTo(createTo);                      // 없으면 기본 이동
  }, [onCreate, ctx, goTo, createTo]);

  const handleEdit = useCallback(
    (row) => {
      const to = typeof editTo === "function" ? editTo(row) : editTo;
      goTo(to);
    },
    [goTo, editTo]
  );

  const handleAskDelete = useCallback(
    (row) => {
      openConfirm({
        title: deleteConfirmTitle,
        message: deleteConfirmMessage(row),
        danger: true,
        onConfirm: () => onDelete?.(row),
      });
    },
    [openConfirm, deleteConfirmTitle, deleteConfirmMessage, onDelete]
  );

  const headerActions = (
    <>
      {withSearch ? (
        <input
          className={styles.input}
          placeholder={searchPlaceholder || "검색"}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      ) : null}

      {extraActions ? extraActions(ctx) : null}

      <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleCreate} type="button">
        {createText}
      </button>
    </>
  );

  const defaultRowActions = (row) => (
    <>
      <button className={styles.btn} onClick={() => handleEdit(row)} type="button">
        {editText}
      </button>
      <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => handleAskDelete(row)} type="button">
        {deleteText}
      </button>
    </>
  );

  return (
    <>
      <AdminPageHeader title={title} desc={desc} actions={headerActions} />

      {beforeTable ? beforeTable(ctx) : null}

      <DataTable
        columns={columns}
        rows={tableRows}
        rowActions={(row) => (renderRowActions ? renderRowActions(row, { ...ctx, handleEdit, handleAskDelete }) : defaultRowActions(row))}
        emptyText={emptyText}
      />

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title}
        message={confirm?.message}
        danger={confirm?.danger}
        onConfirm={confirm?.onConfirm}
        onClose={closeConfirm}
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}

