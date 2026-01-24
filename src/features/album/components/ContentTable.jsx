import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import styles from "../styles/ContentTable.module.css";
import { getKind, toEmbedUrlSmart, toThumbnailSmart } from "../data/youtube";
import useCols from "../../../hooks/useCols";

const ContentTable = ({ title, iconList = [], data = [], emptyText }) => {
  const [dataCount, setDataCount] = useState(3);

  const items = Array.isArray(data) ? data : [];
  const cols = useCols();

  useEffect(() => {
    setDataCount((prev) => Math.max(cols, Math.ceil(prev / cols) * cols));
  }, [cols]);

  const visible = useMemo(() => items.slice(0, dataCount), [items, dataCount]);

  // ✅ 데이터 없음(초기 상태)
  if (items.length === 0) {
    return (
      <div className={styles.contentTable}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.icons}>
            {iconList.map((icon, i) => (
              <FontAwesomeIcon key={i} icon={icon} />
            ))}
          </span>
        </div>

        <div className={styles.actions}>
          <div className={styles.empty}>
            {emptyText || "추천곡이 없습니다 🎧"}
          </div>
        </div>
      </div>
    );
  }

  return (
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
          const kind = getKind(item.url);
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
          // “끝까지 본 상태” 문구 (원하면 숨겨도 됨)
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
  );
};

export default ContentTable;
