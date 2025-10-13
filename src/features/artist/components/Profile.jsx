import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "../styles/Profile.module.css";
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { getAge } from '../../../utill/age';

function Profile({group}) {
  return (
    <div className={styles.Profile}>
      {
        group.member.map((data,i) => {
          const age = getAge(data.birthday)
          return(
            <div className={styles.memberBox} style={{background:data.color, color: data.fontcolor}} key={i}>
              <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/${group.group}images/${data.name}.jpg`} ></img>
              <h3>{data.name}</h3>
              <p>{age != null ? `${age}세 (만 나이)` : '-'}</p>
              <p>{data.birthday}</p>
              <div className={styles.snsBox}>
                { data.instagram === " " ? " "
                  : 
                  <a href={data.instagram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram}/></a>
                }
                { data.yutube === " " ? " "
                  :
                  <a href={data.yutube} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube}  /></a>
                }
                { data.x === " " ? " "
                  : 
                  <a href={data.x} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
                }
                { data.x2 === " " ? " "
                  :              
                  <a href={data.x2} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
                }
              </div>
            </div>
          ) 
        })
      }
    </div>
  )
}

export default Profile