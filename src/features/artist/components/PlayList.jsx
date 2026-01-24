import ContentTable from "../../album/components/ContentTable";
import styles from "../styles/PlayList.module.css";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function toContentItems(list = []) {
  return (Array.isArray(list) ? list : [])
    .map((item) => {
      // 백 구조에 따라 youtube/url/youtubeUrl 다 케어
      const url =
        (item?.youtube || "").trim() ||
        (item?.url || "").trim() ||
        (item?.youtubeUrl || "").trim();

      if (!url) return null;

      const artist = item?.artist || item?.singer || "";
      const title = item?.title || item?.song || item?.contentsname || "";

      return {
        url,
        contentsname: artist && title ? `${artist} - ${title}` : (title || artist || "추천곡"),
        date: item?.date || "",
      };
    })
    .filter(Boolean);
}

function PlayList({ playlist }) {
  // ✅ playlist가 배열로 올 때 / 객체로 올 때 모두 대응
  const memberList =
    (playlist && Array.isArray(playlist.member) && playlist.member) ||
    (Array.isArray(playlist) && playlist) ||
    [];

  if (!memberList.length) return null;

  return (
    <div className={styles.PlayList}>
      {memberList.map((m, idx) => (
        <div className={styles.block} key={m?.id ?? m?.name ?? idx}>
          <ContentTable
            title={`${m?.name ?? "멤버"}의 추천곡 🎧`}
            iconList={[faMusic]}
            data={toContentItems(m?.playlist)}
            emptyText="아직 공개된 추천곡이 없어요 🎧"
          />
        </div>
      ))}
    </div>
  );
}

export default PlayList;
