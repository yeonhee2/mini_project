import ContentTable from "../../album/components/ContentTable";
import styles from "../styles/PlayList.module.css";
import { faMusic } from '@fortawesome/free-solid-svg-icons'

function toContentItems(list = []) {
  return (Array.isArray(list) ? list : [])
    .filter(item => item?.youtube && item.youtube.trim() !== "")
    .map(item => ({
      url: item.youtube,
      contentsname: `${item.artist} - ${item.title}`,
      date: item.date || "", // 데이터에 날짜 없으면 빈 값
    }));
}

function PlayList({playlist}) {
  if (!playlist || !playlist.member) return null;

  return (
    <div className={styles.PlayList}>
      {playlist.member.map((m, idx) => (
        <div className={styles.block} key={idx}>
          <ContentTable
            title={`${m.name}의 추천곡 🎧`}
            iconList={[faMusic]}
            data={toContentItems(m.playlist)}
          />
        </div>
      ))}
    </div>
  )
}

export default PlayList