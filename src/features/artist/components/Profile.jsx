import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "../styles/Profile.module.css";
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { getAge } from '../../../utill/age';

function imgUrl(x) {
  if (!x) return null;
  // Vite import 또는 new URL(..., import.meta.url).src 를 모두 케어
  if (typeof x === "string") return x;
  if (typeof x === "object" && typeof x.src === "string") return x.src;
  return null;
}

function Profile({group}) {
  const members = Array.isArray(group?.member) ? group.member : [];

  return (
    <div className={styles.Profile}>
      {
        members.map((data,i) => {
          const age = getAge(data?.birthday);
          // 1) 데이터에 photo가 있으면 그걸 우선 사용 (문자열/모듈 모두 허용)
          // 2) 없으면 기존 규칙 경로로 폴백
          const primarySrc =
            imgUrl(data?.photo) ||
            `https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/${group?.group}images/${encodeURIComponent(data?.name)}.jpg`;

          // 혹시 jpg가 404면 png로 한 번 더 시도하고, 그마저도 없으면 최종 폴백 이미지
          const handleImgError = (e) => {
            const src = e.currentTarget.src;
            if (src.endsWith(".jpg")) {
              e.currentTarget.src = src.replace(".jpg", ".png");
            } else {
              e.currentTarget.src = FALLBACK_IMG;
            }
          };

          // 공백 비교 대신 문자열 trim 후 truthy 체크
          const ig = (data?.instagram || "").trim();
          const yt = (data?.youtube || data?.yutube || "").trim(); // 키 오타(yutube)도 케어
          const x1 = (data?.x || "").trim();
          const x2 = (data?.x2 || "").trim();
          return(
            <div className={styles.memberBox} style={{background:data.color, color: data.fontcolor}} key={i}>
              <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/${group.group}images/${data.name}.jpg`} ></img>
              <h3>{data.name}</h3>
              <p>{age != null ? `${age}세 (만 나이)` : '-'}</p>
              <p>{data.birthday || '-'}</p>

              <div className={styles.snsBox}>
                {ig && (
                  <a href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                )}
                {yt && (
                  <a href={yt} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                )}
                {x1 && (
                  <a href={x1} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                )}
                {x2 && (
                  <a href={x2} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) 2">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                )}
              </div>
            </div>
          ) 
        })
      }
    </div>
  )
}

export default Profile