import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './PlayList.css'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

function PlayList({playlist}) {
  return (
    <div className="PlayList">
      <div className="inventory">
        {
          playlist.member.map((data,i) => {
            return (
              <div className="inventory-name" key={i}>
                <h3>{data.name}의 추천곡 🎧</h3>
                <table>
                  <thead>
                    <tr>
                      <th style={{width:'230px'}}>가수</th>
                      <th style={{width:'270px'}}>제목</th>
                      <th>유튜브</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.playlist.map((list,j) => {
                        return (
                          <tr key={j} >
                            <td>{list.artist}</td>
                            <td>{list.title}</td>
                            <td><a href={list.youtube} target="_blank"><FontAwesomeIcon icon={faMusic} /></a></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
              
          })
        }
      </div>
    </div>
  )
}

export default PlayList