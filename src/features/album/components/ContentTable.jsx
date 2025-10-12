import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import styles from "../styles/ContentTable.module.css";
import { getKind, toEmbedUrlSmart, toThumbnailSmart } from "../data/youtube";
import useCols from "../../../hooks/useCols";

const ContentTable = ({ title, iconList = [], data = [] }) => {
  const [dataCount, setDataCount] = useState(3)
  const items = Array.isArray(data) ? data : [];
  const visible = items.slice(0, dataCount);
  const cols = useCols()

  useEffect(() => {
    // 창 크기 바뀌면 현재 보이는 걸 '행 단위'로 자연스럽게 맞추기
    setDataCount((prev) => Math.max(cols, Math.ceil(prev / cols) * cols));
  }, [cols]);

  return(
    <>
      {data === " " ? (
        ""
      ) : (
        <div className={styles.contentTable}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.icons}>
              {iconList.map((icon, i) => (
                <FontAwesomeIcon key={i} icon={icon} />
              ))}
            </span>
          </div>

          <div className={styles.grid}>
            {visible.map((item, i) => {
              const kind = getKind(item.url); // 'video' | 'playlist' | 'external'
              const embed = toEmbedUrlSmart(item.url);
              const thumb = toThumbnailSmart(item.url);

              return (
                <div key={i} className={styles.card}>
                  {embed ? (
                    <div className={styles.player}>
                      <iframe
                        src={embed}
                        title={item.contentsname || `yt-${i}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  ) : (
                    <a
                      className={styles.thumbLink}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube로 열기"
                    >
                      {thumb ? (
                        <img src={thumb} alt={item.contentsname || "thumbnail"} />
                      ) : (
                        <div className={styles.thumbPlaceholder} />
                      )}
                      <span className={styles.playBadge}>
                        {kind === "playlist" ? "재생목록 보기" : "YouTube로 보기"}
                      </span>
                    </a>
                  )}

                  <div className={styles.meta}>
                    <p className={styles.name}>
                      {item.contentsname}
                      {kind === "playlist" && (
                        <span className={styles.kindBadge}>재생목록</span>
                      )}
                    </p>
                    <span className={styles.date}>{item.date}</span>
                    <a
                      className={styles.outLink}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      새 창에서 보기
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            {dataCount >= items.length ? (
              <div className={styles.empty}>더 이상 영상이 없습니다.</div>
            ) : (
              <button
                className={styles.moreBtn}
                onClick={() => setDataCount((c) => c + cols)}
              >
               더보기
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ContentTable