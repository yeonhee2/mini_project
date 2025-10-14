import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShop, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styles from "../styles/ArtistPage.module.css";
import Profile from '../components/Profile';
import PlayList from '../components/PlayList';
import Schedule from '../../schedule/pages/Schedule';
import Spinners from '../../../components/ui/Spinner';

const GROUP_COLORS = {
  day6: "#0F2B66",
  twice: "#ff91b6",
  straykids: "#8b0000",
  itzy: "#b7b1ff",
  nmixx: "#00e2ff",
  niziu: "#ffe600",
};

function ArtistPage ( {group, performance, suggest, album, schedule, memschedule} ) {
  const [activeTab, setActiveTab] = useState("profile");
  const videoSrc = group?.src ?? null;

  const brandColor =
    group?.color ||
    GROUP_COLORS?.[group?.key?.toLowerCase?.()] ||
    "#6b7280";

  const [videoLoading, setVideoLoading] = useState(!!videoSrc);
  useEffect(() => {
    setVideoLoading(!!videoSrc);
  }, [videoSrc]);

  return (
    <div className={styles.ArtistPage}>
      <div className={styles.videoSection} style={{ position: "relative" }}>
        {videoSrc && videoLoading && (
          <Spinners
            size={26}
            color={brandColor}
            label="영상 불러오는 중..."
            showLabel
            position="container"
          />
        )}
        {videoSrc ? (
          <iframe
            src={videoSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onLoad={() => setVideoLoading(false)}
            onError={() => setVideoLoading(false)}
          />
        ) : (
          <div className={styles.videoPlaceholder}>영상이 준비되지 않았어요</div>
        )}
        <div className={styles.sns}>
          {group?.instagram && (
            <a href={group.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          )}
          {/* ⚠️ 키 이름이 youtube인지 yutube인지 실제 데이터 키 확인! */}
          {group?.youtube && (
            <a href={group.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          )}
          {group?.x && (
            <a href={group.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
          )}
          {group?.shop && (
            <a href={group.shop} target="_blank" rel="noopener noreferrer" aria-label="Shop">
              <FontAwesomeIcon icon={faShop} size="2x" />
            </a>
          )}
          {group?.fans && (
            <a href={group.fans} target="_blank" rel="noopener noreferrer" aria-label="Fan Community">
              <FontAwesomeIcon icon={faUsersRectangle} size="2x" />
            </a>
          )}
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