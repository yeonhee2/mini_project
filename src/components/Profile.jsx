import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Profile.css'
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

function Profile({group}) {
  return (
    <div className="Profile">
      {
        group.member.map((data,i) => {
          return(
            <div className="member-box" style={{background:data.color, color: data.fontcolor}} key={i}>
              <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/DAY6images/${data.name}.jpg`} ></img>
              <h3>{data.name}</h3>
              <p>{data.age}세 (만 나이)</p>
              <p>{data.birthday}</p>
              { data.instagram === " " ? " "
                : 
                <a href={data.instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
              }
              { data.yutube === " " ? " "
                :
                <a href={data.yutube} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
              }
              { data.x === " " ? " "
                : 
                <a href={data.x} target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a>
              }
              { data.x2 === " " ? " "
                :              
                <a href={data.x2} target="_blank"><FontAwesomeIcon icon={faXTwitter}/>2</a>
              }

            </div>
          ) 
        })
      }
    </div>
  )
}

export default Profile