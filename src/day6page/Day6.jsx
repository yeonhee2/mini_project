import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Profile from "../components/Profile"
import './Day6.css'
import { faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faShop, faUsersRectangle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function Day6( {group} ) {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="Day6">
      <div className="video-section">
        <iframe 
          src="https://www.youtube.com/embed/0fyZqS0N19o?si=e1qrElflhE0W8vzq" 
          title="YouTube video player"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
        <div className="sns">
          <a href={group.instagram}><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
          <a href={group.yutube}><FontAwesomeIcon icon={faYoutube} size="2x"/></a>
          <a href={group.x}><FontAwesomeIcon icon={faXTwitter} size="2x"/></a>
          <a href={group.shop}><FontAwesomeIcon icon={faShop} size="2x"/></a>
          <a href={group.fans}><FontAwesomeIcon icon={faUsersRectangle} size="2x"/></a>
        </div>
      </div>

      <nav className="day6-nav">
        <ul className="menu">
          <li onClick={() => setActiveTab("profile")}>멤버 프로필</li>
          <li onClick={() => setActiveTab("schedule")}>스케줄</li>
          <li onClick={() => setActiveTab("playlist")}>멤버별 추천 플레이리스트</li>
        </ul>
      </nav>

      <div className="content">
        {activeTab === "profile" && <Profile group={group} />}
        {activeTab === "schedule" && <p>스케줄 컴포넌트 준비 중...</p>}
        {activeTab === "playlist" && <p>추천 플레이리스트 준비 중...</p>}
      </div>
      
    </div>
  )
}

export default Day6