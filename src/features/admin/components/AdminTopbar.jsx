// 모든 내부 import는 alias(@/)로 통일
import styles from "../styles/Admin.module.css";
import useAdminMe from "../hooks/useAdminMe";
import { adminLogout } from "../api/adminAuthApi";
import UseNavi from "@/hooks/UseNavi";

export default function AdminTopbar() {
  const { goTo } = UseNavi();
  const { me } = useAdminMe();

  const onLogout = async () => {
    try {
      // 서버 세션/토큰 로그아웃
      await adminLogout();
    } catch (e) {
      // 실패해도 프론트에서는 로그아웃 처리
      console.warn("logout failed:", e);
    } finally {
      // 프론트 인증 정보 정리
      localStorage.removeItem("admin_token");

      // 로그인 페이지로 이동 (히스토리 제거)
      goTo("/admin/login", { replace: true });
    }
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <span className={styles.topbarTitle}>관리자</span>
      </div>

      <div className={styles.topbarRight}>
        <div className={styles.meBox}>
          <div className={styles.meLabel}>로그인</div>
          <div className={styles.meValue}>
            {me?.username || me?.email || "admin"}
          </div>
        </div>

        <button
          type="button"
          className={styles.btn}
          onClick={onLogout}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}

