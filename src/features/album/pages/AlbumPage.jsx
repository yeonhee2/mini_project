import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHouse, faMusic, faRadio, faTv, faVideo } from "@fortawesome/free-solid-svg-icons";
import UseNavi from "../../../hooks/UseNavi";
import ContentTable from "../components/ContentTable";
import styles from "../styles/AlbumPage.module.css";


function AlbumPage() {
  const {goIndex} = UseNavi()
  const location = useLocation()
  const album = location.state.group;
  const [albumDetail, setAlbumDetail] = useState([])
  const [imgRatioClass, setImgRatioClass] = useState("");
  
  useEffect(() => {
    axios.get(`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/${album}.json`)
     .then((response) => {
       setAlbumDetail(response.data[0])
     })
     .catch((error) => {
      console.log(error)
     })
  }, [])

  const onImgLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    const r = w / h;
    // 임계값은 살짝 여유 있게 (원본 DAY6는 와이드)
    if (r >= 1.3) setImgRatioClass("wide");
    else if (r <= 0.9) setImgRatioClass("tall");
    else setImgRatioClass("square");
  };

  
  return(
    <div className={styles.AlbumPage}>
      <div className={styles.information}>
        <div className={`${styles.groupimg} ${styles[imgRatioClass]}`}>
          <img 
            src={albumDetail.images} 
            alt={albumDetail.name} 
            loading="lazy"
            onLoad={onImgLoad}
          />
        </div>
        <div className={styles.text}>
          <h1>💿 {albumDetail.name}</h1>
          <p>타이틀 -  &nbsp;{albumDetail.title}</p>
          <p>발매일 -  &nbsp;{albumDetail.releaseDate}</p>
        </div>
        <div className={styles.homeIcon} onClick={()=> goIndex()}>
          <FontAwesomeIcon icon={faHouse} size="2xl" />
        </div>
      </div>
      <ContentTable
        title="유튜브"
        iconList={[faYoutube]}
        data={albumDetail.Youtube}
      />
      <ContentTable
        title="음악방송"
        iconList={[faMusic, faTv]}
        data={albumDetail.musicbroadcast}
      />
      <ContentTable
        title="음악방송 - 직캠"
        iconList={[faVideo]}
        data={albumDetail.fancam }
      />
      <ContentTable
        title="라디오"
        iconList={[faRadio]}
        data={albumDetail.radio}
      />
      <ContentTable
        title="TV프로그램"
        iconList={[faTv]}
        data={albumDetail.tvshow}
      />
    </div>
  )
}

export default AlbumPage