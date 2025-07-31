import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import './AlbumPage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMusic, faRadio, faTv, faVideo } from "@fortawesome/free-solid-svg-icons";

function AlbumPage() {
  const location = useLocation()
  const album = location.state;
  const [albumDetail, setAlbumDetail] = useState([])
  
  useEffect(() => {
    axios.get(`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/${album}.json`)
     .then((response) => {
       setAlbumDetail(response.data[0])
     })
     .catch((error) => {
      console.log(error)
     })
  }, [])

  if(albumDetail.length === 0) {
    return <div style={{marginTop: '10px'}}> 정보 불러오는 중</div>
  }
  
  return(
    <div className="AlbumPage">
      <div className="information">
        <div className="groupimg">
          <img src={albumDetail.images}></img>
        </div>
        <div className="text">
          <h1>💿 {albumDetail.name}</h1>
          <p>타이틀 -  &nbsp;{albumDetail.title}</p>
          <p>발매일 -  &nbsp;{albumDetail.releaseDate}</p>
          {
            albumDetail.rankings.map((ranking,i) => {
              
              return (
                <p key={i}>{Object.keys(ranking)} : {Object.values(ranking)}</p>
              )
            })
          }
        </div>
      </div>
      { albumDetail.Youtube === " " ? " "
        :
        <div className="contents-youtube">
          <h3>유튜브&nbsp;<FontAwesomeIcon icon={faYoutube} /></h3>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>제목</th>
                <th>영상</th>
              </tr>
            </thead>
            <tbody>
              {
                albumDetail.Youtube.map( (data,i) => {
                  return (
                    <tr key={i}>
                      <td>{data.date}</td>
                      <td>{data.contentsname}</td>
                      <td><a href={data.url} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>  
      }
      { albumDetail.musicbroadcast === " " ? " "
        :
        <div className="contents-music">
          <h3>음악방송&nbsp;<FontAwesomeIcon icon={faMusic} /><FontAwesomeIcon icon={faTv} /></h3>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>제목</th>
                <th>영상</th>
              </tr>
            </thead>
            <tbody>
              {
                albumDetail.musicbroadcast.map( (broad,i) => {
                  return (
                    <tr key={i}>
                      <td>{broad.date}</td>
                      <td>{broad.contentsname}</td>
                      <td><a href={broad.url} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>   
      }
      { albumDetail.fancam === " " ? " "
        :
        <div className="contents-fancam">
          <h3>음악방송 - 직캠&nbsp;<FontAwesomeIcon icon={faVideo} /></h3>
          <table>
            <thead>
              <tr>
                  <th>날짜</th>
                  <th>제목</th>
                  <th>영상</th>
              </tr>
            </thead>
            <tbody>
              {
                albumDetail.fancam.map( (cam,i) => {
                  return (
                    <tr key={i}>
                      <td>{cam.date}</td>
                      <td>{cam.contentsname}</td>
                      <td><a href={cam.url} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>  
      }
      { albumDetail.radio === " " ? " "
        :
        <div className="contents-radio">
          <h3>라디오&nbsp;<FontAwesomeIcon icon={faRadio} /></h3>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>제목</th>
                <th>영상</th>
              </tr>
            </thead>
            <tbody>
              {
                albumDetail.radio.map( (radio,i) => {
                  return (
                    <tr key={i}>
                      <td>{radio.date}</td>
                      <td>{radio.contentsname}</td>
                      <td><a href={radio.url} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      }
      { albumDetail.tvshow === " " ? " "
        :
        <div className="contents-tv">
          <h3>TV프로그램&nbsp;<FontAwesomeIcon icon={faTv} /></h3>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>제목</th>
                <th>영상</th>
              </tr>
              
            </thead>
            <tbody>
              {
                albumDetail.tvshow.map( (show,i) => {
                  return (
                    <tr key={i}>
                      <td>{show.date}</td>
                      <td>{show.contentsname}</td>
                      <td><a href={show.url} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default AlbumPage