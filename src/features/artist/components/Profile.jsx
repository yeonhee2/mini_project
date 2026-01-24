import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Profile.module.css";
import {
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { getAge } from "../../../utill/age";

// 최종 폴백 (선택)
const FALLBACK_IMG =
  "https://via.placeholder.com/300x400?text=No+Image";

function Profile({ group }) {
  const members = Array.isArray(group?.member) ? group.member : [];

  return (
    <div className={styles.Profile}>
      {members.map((data) => {
        const age = getAge(data?.birthday);

        const profileSrc = data?.profileUrl || FALLBACK_IMG;

        const ig = (data?.instagram || "").trim();
        const yt = (data?.youtube || "").trim();
        const x1 = (data?.x || "").trim();
        const x2 = (data?.x2 || "").trim();

        return (
          <div
            key={data.id}
            className={styles.memberBox}
            style={{
              background: data.color,
              color: data.fontcolor,
            }}
          >
            <img
              src={profileSrc}
              alt={`${data.name} 프로필`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />

            <h3>{data.name}</h3>
            <p>{age != null ? `${age}세 (만 나이)` : "-"}</p>
            <p>{data.birthday || "-"}</p>

            <div className={styles.snsBox}>
              {ig && (
                <a
                  href={ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              )}
              {yt && (
                <a
                  href={yt}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              )}
              {x1 && (
                <a
                  href={x1}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              )}
              {x2 && (
                <a
                  href={x2}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) 2"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
