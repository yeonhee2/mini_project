import UseNavi from "@/hooks/UseNavi";
import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import SaveCancelActions from "@/features/admin/components/SaveCancelActions";
import styles from "@/features/admin/styles/Admin.module.css";

/**
 * AdminCrudFormPage
 * - title/desc
 * - backTo: 목록 이동 경로
 * - onSubmit: (event) => void|Promise
 * - submitText / cancelText
 * - children: FormCard 들 (폼 필드 구성)
 *
 * 이 컴포넌트는 "레이아웃/버튼"만 책임지고,
 * form state는 각 페이지(ArtistForm 등)에서 관리하도록 함.
 */
export default function AdminCrudFormPage({
  title,
  desc,
  backTo,

  onSubmit,
  submitText,
  cancelTo,
  cancelText = "취소",

  children,
  gridClassName = styles.formGridOne, // 기본 1컬럼
}) {
  const { goTo } = UseNavi();

  return (
    <>
      <AdminPageHeader
        title={title}
        desc={desc}
        actions={
          <button className={styles.btn} onClick={() => goTo(backTo)} type="button">
            ← 목록
          </button>
        }
      />

      <form onSubmit={onSubmit} className={gridClassName}>
        {children}

        <SaveCancelActions
          submitText={submitText}
          cancelText={cancelText}
          cancelTo={cancelTo || backTo}
        />
      </form>
    </>
  );
}
