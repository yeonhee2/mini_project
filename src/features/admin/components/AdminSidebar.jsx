import { NavLink } from "react-router-dom";
import styles from "../styles/Admin.module.css";

const links = [ 
  { to: "/admin/artists", label: "아티스트" },
  { to: "/admin/members", label: "멤버" },
  { to: "/admin/albums", label: "앨범" },
  { to: "/admin/activities", label: "앨범 활동" },
  { to: "/admin/concerts", label: "콘서트" },
  { to: "/admin/schedules/group", label: "그룹 스케줄" },
  { to: "/admin/schedules/member", label: "개인 스케줄" },
  { to: "/admin/assets", label: "이미지/로고" },
  { to: "/admin/change-password", label: "비밀번호 변경" },
];

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandTitle}>Admin</div>
        <div className={styles.brandSub}>JYP Platform</div>
      </div>

      <nav className={styles.nav}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/admin"}
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ""].join(" ")
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
