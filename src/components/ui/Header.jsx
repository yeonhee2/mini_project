import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/Header.module.css";
import UseNavi from "../../hooks/UseNavi";

function Header({ artist }) {
  const [isOpen, setIsOpen] = useState(false);
  const { goIndex, goTo } = UseNavi();
  const { pathname } = useLocation();

  const onNav = (path) => {
    goTo(path);
    setIsOpen(false);
  };

  const onHome = () => {
    goIndex();
    setIsOpen(false);
  };

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderInner}>
        <div className={styles.homeLogo}>
          <img
            src="/Idol-Note.png"
            onClick={onHome}
            alt="Idol Note Home"
            draggable={false}
          />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="global-nav"
          aria-label="메뉴 열기"
          type="button"
        >
          ≡
        </button>

        <nav
          id="global-nav"
          className={`${styles.navPanel} ${isOpen ? styles.open : ""}`}
        >
          <ul className={styles.navMenu}>
            {artist?.map((g) => {
              const groupSlug = String(g.group || "").toLowerCase();
              const debutYmd = String(g.id || "").replace(/[^0-9]/g, "");
              const targetPath = `/${groupSlug}/${debutYmd}`;

              // 현재 페이지(하위 라우트 포함) 활성 처리
              const isActive =
                pathname === targetPath || pathname.startsWith(`${targetPath}/`);

              return (
                <li key={g.id}>
                  <button
                    type="button"
                    className={`${styles.logoBtn} ${
                      isActive ? styles.activeLogo : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNav(targetPath);
                    }}
                    aria-label={`${g.group} 페이지로 이동`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <img src={g.logoUrl} alt={g.group} draggable={false} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;



