import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Profile from "../components/Profile"
import './Day6.css'
import { faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faShop, faUsersRectangle } from "@fortawesome/free-solid-svg-icons"

function Day6( {group} ) {
  
  return (
    <div className="Day6">
      <div className="video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/0fyZqS0N19o?si=e1qrElflhE0W8vzq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <div className="sns">
          <a href={group.instagram} ><FontAwesomeIcon icon={faInstagram} size="2x" /></a><br></br>
          <a href={group.yutube} ><FontAwesomeIcon icon={faYoutube} size="2x"/></a><br></br>
          <a href={group.x}><FontAwesomeIcon icon={faXTwitter} size="2x"/></a><br></br>
          <a href={group.shop}><FontAwesomeIcon icon={faShop} size="2x"/></a><br></br>
          <a href={group.fans}><FontAwesomeIcon icon={faUsersRectangle} size="2x"/></a><br></br>
        </div>
      </div>
      <nav>
        <ul className="memu">
          <li>멤버 프로필</li>
          <li>스케줄</li>
          <li>멤버별 추천 플레이리스트</li>
        </ul>
      </nav>
      
      <Profile group={group} />
    </div>
  )
}

export default Day6