import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShop, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from "../styles/ArtistPage.module.css";
import Profile from '../components/Profile';
import PlayList from '../components/PlayList';
import Schedule from '../../schedule/pages/Schedule';


function ArtistPage ( {group, performance, suggest, album, schedule, memschedule} ) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={styles.ArtistPage}>
      <div className={styles.videoSection} style={{ position: "relative" }}>
        <iframe 
          src={group.src} 
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          loading="lazy" 
        />
        <div className={styles.sns}>
          <a href={group.instagram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
          <a href={group.yutube} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} size="2x"/></a>
          <a href={group.x} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} size="2x"/></a>
          <a href={group.shop} target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={faShop} size="2x"/></a>
          <a href={group.fans} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faUsersRectangle} size="2x"/></a>
        </div>
      </div>

      <nav className={styles.artistPageNav}>
        <ul className={styles.menu}>
          <li className={activeTab==="profile" ? styles.active : ""} onClick={() => setActiveTab("profile")}>멤버 프로필</li>
          <li className={activeTab==="schedule" ? styles.active : ""} onClick={() => setActiveTab("schedule")}>스케줄</li>
          <li className={activeTab==="playlist" ? styles.active : ""} onClick={() => setActiveTab("playlist")}>멤버별 추천 플레이리스트</li>
        </ul>
      </nav>

      <div className={styles.content}>
        {activeTab === "profile" && <Profile group={group} />}
        {activeTab === "schedule" && <Schedule performance={performance} group={group} album={album} schedule={schedule} memschedule={memschedule}/>}
        {activeTab === "playlist" && <PlayList playlist={suggest} /> }
      </div>
      
    </div>
  )
}

export default ArtistPage