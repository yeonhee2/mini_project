import UseNavi from "@/hooks/UseNavi";
import AdminPageHeader from "@/features/admin/components/AdminPageHeader";
import styles from "@/features/admin/styles/Admin.module.css";

export default function AdminDashboard() {
  const { goTo } = UseNavi();

  const quick = [
    { title: "아티스트", desc: "그룹 등록/수정/삭제", to: "/admin/artists" },
    { title: "멤버", desc: "멤버 등록/수정/삭제", to: "/admin/members" },
    { title: "앨범", desc: "앨범 등록/수정/삭제", to: "/admin/albums" },
    { title: "앨범 활동", desc: "앨범별 활동 CRUD", to: "/admin/activities" },
    { title: "콘서트", desc: "콘서트 일정 CRUD", to: "/admin/concerts" },
    { title: "그룹 스케줄", desc: "그룹 스케줄 CRUD", to: "/admin/schedules/group" },
    { title: "개인 스케줄", desc: "개인 스케줄 CRUD", to: "/admin/schedules/member" },
    { title: "이미지/로고", desc: "로고/커버/프로필 교체", to: "/admin/assets" },
  ];

  return (
    <div>
      <AdminPageHeader
        title="관리자 대시보드"
        desc="아래 메뉴에서 관리 기능을 선택하세요."
      />

      <div className={styles.dashboardGrid}>
        {quick.map((q) => (
          <button
            key={q.to}
            type="button"
            className={styles.dashboardCard}
            onClick={() => goTo(q.to)}
          >
            <div className={styles.cardTitle}>{q.title}</div>
            <div className={styles.cardDesc}>{q.desc}</div>
          </button>
        ))}
      </div>

      <div className={styles.noticeBox}>
        <div className={styles.noticeTitle}>안내</div>
        <ul className={styles.noticeList}>
          <li>등록/수정은 “List → 새로 만들기 / 수정” 흐름으로 진행됩니다.</li>
          <li>이미지 업로드는 “이미지/로고” 또는 각 폼에서 교체할 수 있습니다.</li>
          <li>API 연결 전까지는 더미 데이터로 UI만 확인하세요.</li>
        </ul>
      </div>
    </div>
  );
}
