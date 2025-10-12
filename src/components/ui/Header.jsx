import { useState } from 'react'
import styles from '../styles/Header.module.css'
import UseNavi from '../../hooks/UseNavi';


function Header() {
  const[isOpen, setIsOpen] = useState(false);
  const {goIndex, goTo} = UseNavi()
  
  const onNav = (path) => {
   goTo(path);
   setIsOpen(false);     // 이동하면 접힘
  };

  const onHome = () => {
   goIndex();
   setIsOpen(false);     // 홈 이동도 접힘
  };

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderInner}>
        <div className={styles.homeLogo}>
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/Idol-Note.png`} 
            onClick={onHome} 
            alt="Idol Note Home"
          />
        </div>

        <button 
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="global-nav"
          aria-label="메뉴 열기"
          >
          ≡
        </button>

        <nav 
          id="global-nav"
          className={`${styles.navPanel} ${isOpen ? styles.open : ''}`}
        >
          <ul className={styles.navMenu}>
            <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/DAY6.png`} onClick={() => onNav('/day6/20150907')}></img></li>
            <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/TWICE.png`} onClick={() => onNav('/twice/20151020')}></img></li>
            <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/StrayKids.png`} onClick={() => onNav('/straykids/20180325')}></img></li>
            <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/ITZY.png`} onClick={() => onNav('/itzy/20190212')}></img></li>
            <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/NMIXX.png`} onClick={() => onNav('/nmixx/20220222')}></img></li>
            <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/NiziU.png`} onClick={() => onNav('/niziu/20201202')}></img></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header