import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ArtistPage.css'
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShop, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import Schedule from './Schedule';
import PlayList from './PlayList';
import { useState } from 'react';

function ArtistPage ( {group, performance, suggest, album, schedule, memschedule} ) {
 const [activeTab, setActiveTab] = useState("profile");

 if(group.length === 0) {
    return <div> 정보 불러오는 중</div>
  }
  
  return (
    <div className="ArtistPage">
      <div className="video-section">
        <iframe 
          src={group.src} 
          title="YouTube video player"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
        <div className="sns">
          <a href={group.instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
          <a href={group.yutube} target="_blank"><FontAwesomeIcon icon={faYoutube} size="2x"/></a>
          <a href={group.x} target="_blank"><FontAwesomeIcon icon={faXTwitter} size="2x"/></a>
          <a href={group.shop} target="_blank"><FontAwesomeIcon icon={faShop} size="2x"/></a>
          <a href={group.fans} target="_blank"><FontAwesomeIcon icon={faUsersRectangle} size="2x"/></a>
        </div>
      </div>

      <nav className="artistPage-nav">
        <ul className="menu">
          <li onClick={() => setActiveTab("profile")}>멤버 프로필</li>
          <li onClick={() => setActiveTab("schedule")}>스케줄</li>
          <li onClick={() => setActiveTab("playlist")}>멤버별 추천 플레이리스트</li>
        </ul>
      </nav>

      <div className="content">
        {activeTab === "profile" && <Profile group={group} />}
        {activeTab === "schedule" && <Schedule performance={performance} group={group} album={album} schedule={schedule} memschedule={memschedule}/>}
        {activeTab === "playlist" && <PlayList playlist={suggest} /> }
      </div>
      
    </div>
  )
}

export default ArtistPage