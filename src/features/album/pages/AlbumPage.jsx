import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {useLocation, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHouse, faMusic, faRadio, faTv, faVideo } from "@fortawesome/free-solid-svg-icons";
import UseNavi from "../../../hooks/UseNavi";
import ContentTable from "../components/ContentTable";
import styles from "../styles/AlbumPage.module.css";
import Spinners from "../../../components/ui/Spinner";

const GROUP_COLORS = {
  day6: "#0F2B66",
  twice: "#ff91b6",
  straykids: "#8b0000",
  itzy: "#b7b1ff",
  nmixx: "#00e2ff",
  niziu: "#ffe600",
};

function AlbumPage() {
  const {goIndex} = UseNavi()
  const location = useLocation()
  const params = useParams();

  const albumKey = useMemo(() => {
    return location?.state?.group || params.group
  }, [location, params]) 

  const [albumDetail, setAlbumDetail] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [imgLoading, setImgLoading] = useState(true)
  const [imgRatioClass, setImgRatioClass] = useState("");
  
  useEffect(() => {
    if (!albumKey) return;
    setPageLoading(true)
    axios.get(`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/${albumKey}.json`)
     .then((response) => {
      const detail = response.data?.[0] || {}
       setAlbumDetail(detail)
       setImgLoading(!!detail.images)
     })
     .catch((error) => {
      console.error(error)
      setAlbumDetail([])
      setImgLoading(false)
     }).finally(() => {
      setPageLoading(false)
     })
  }, [albumKey])

  const brandColor =
    albumDetail?.color ||
    GROUP_COLORS?.[albumKey?.toLowerCase?.()] ||
    "#6b7280";

  const onImgLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    const r = w / h;
    // 임계값은 살짝 여유 있게 (원본 DAY6는 와이드)
    if (r >= 1.3) setImgRatioClass("wide");
    else if (r <= 0.9) setImgRatioClass("tall");
    else setImgRatioClass("square");
    setImgLoading(false); 
  };

  
  return(
    <div className={styles.AlbumPage}>
      <section style={{ position: "relative"}}>
        {(pageLoading || (imgLoading && !!albumDetail?.images)) && (
          <Spinners size={28} label="앨범 정보 불러오는 중..." color={brandColor} showLabel position="container" />
        )}
        <div className={styles.information} aria-busy={pageLoading}>
          <div className={`${styles.groupimg} ${styles[imgRatioClass]}`}>
            {albumDetail?.images ? (
              <img
                src={albumDetail.images}
                alt={albumDetail.name}
                loading="lazy"
                onLoad={onImgLoad}
                onError={() => setImgLoading(false)}
              />
            ) : (
              // 데이터 없을 때도 레이아웃 유지
              <div className={styles.imgPlaceholder} />
            )}
          </div>
          <div className={styles.text}>
            <h1>💿 {albumDetail.name ?? "—"}</h1>
            <p>타이틀 -  &nbsp;{albumDetail.title ?? "—"}</p>
            <p>발매일 -  &nbsp;{albumDetail.releaseDate ?? "—"}</p>
          </div>
          <button className={styles.homeIcon} onClick={goIndex} aria-label="홈으로">
            <FontAwesomeIcon icon={faHouse} size="2xl" />
          </button>
        </div>
      </section> 

      <section style={{ position: "relative"}}>
        {pageLoading && (
          <Spinners size={24} label="유튜브 불러오는 중..." showLabel color={brandColor} position="container" />
        )}
        <ContentTable
          title="유튜브"
          iconList={[faYoutube]}
          data={albumDetail?.Youtube || []}
        />
      </section>

      <section style={{ position: "relative"}}>
        {pageLoading && (
          <Spinners size={24} label="음악방송 불러오는 중..." showLabel color={brandColor} position="container" />
        )}
        <ContentTable
          title="음악방송"
          iconList={[faMusic, faTv]}
          data={albumDetail?.musicbroadcast || []}
        />
      </section>

      <section style={{ position: "relative"}}>
        {pageLoading && (
          <Spinners size={24} label="직캠 불러오는 중..." showLabel color={brandColor} position="container" />
        )}
        <ContentTable
          title="음악방송 - 직캠"
          iconList={[faVideo]}
          data={albumDetail?.fancam || [] }
        />
      </section>

      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners size={24} label="라디오 불러오는 중..." showLabel color={brandColor} position="container" />
        )}
        <ContentTable
          title="라디오"
          iconList={[faRadio]}
          data={albumDetail?.radio || []}
        />
      </section>

      <section style={{ position: "relative"}}>
        {pageLoading && (
          <Spinners size={24} label="TV프로그램 불러오는 중..." showLabel color={brandColor} position="container" />
        )}
        <ContentTable
          title="TV프로그램"
          iconList={[faTv]}
          data={albumDetail?.tvshow || []}
        />
      </section>
    </div>
  )
}

export default AlbumPage