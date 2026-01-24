import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHouse, faMusic, faRadio, faTv, faVideo } from "@fortawesome/free-solid-svg-icons";

import UseNavi from "../../../hooks/UseNavi";
import ContentTable from "../components/ContentTable";
import styles from "../styles/AlbumPage.module.css";
import Spinners from "../../../components/ui/Spinner";
import { frontApi } from "@/api/frontApi";

function AlbumPage() {
  const { goIndex } = UseNavi();
  const location = useLocation();
  const params = useParams();

  const albumKey = useMemo(() => {
    return location?.state?.group || params.group;
  }, [location, params]);

  const [albumDetail, setAlbumDetail] = useState({});
  const [albumList, setAlbumList] = useState([]); // 원본(중복 포함) 리스트
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);

  // albumId 기준으로 중복 제거한 "셀렉트용" 리스트
  const uniqueAlbumList = useMemo(() => {
    const map = new Map();

    for (const a of albumList) {
      // ✅ GROUP만
      if (a?.groupsolo !== "GROUP") continue;

      if (a?.albumId == null) continue;
      if (!map.has(a.albumId)) map.set(a.albumId, a);
    }

    return Array.from(map.values());
  }, [albumList]);

  // =========================
  // 그룹 들어오면 앨범 목록 로드 (셀렉트 옵션)
  // =========================
  useEffect(() => {
    if (!albumKey) return;

    frontApi
      .getAlbum(albumKey)
      .then((res) => {
        // requestHandler가 data를 풀어주면 res가 dto일 수도 있고,
        // ApiResponse 형태면 res.data.data에 들어있을 수 있음
        const dto = res?.data?.data ?? res?.data ?? res ?? {};
        const list = dto?.music ?? [];

        setAlbumList(list);

        // 기본 선택: albumId 중복 제거 후 첫 번째(최신) 앨범
        const map = new Map();
        for (const a of list) {
          if (a?.groupsolo !== "GROUP") continue; // GROUP만
          if (a?.albumId == null) continue;
          if (!map.has(a.albumId)) map.set(a.albumId, a);
        }
        const unique = Array.from(map.values());
        setSelectedAlbumId(unique?.[0]?.albumId ?? null);
      })
      .catch((err) => {
        console.error(err);
        setAlbumList([]);
        setSelectedAlbumId(null);
      });
  }, [albumKey]);

  // =========================
  // 2) 선택된 albumId로 상세 + 활동내역 로드
  // =========================
  useEffect(() => {
    if (!albumKey) return;

    setPageLoading(true);

    const req = selectedAlbumId
      ? frontApi.getAlbumDetailByAlbumId(albumKey, selectedAlbumId)
      : frontApi.getLatestAlbumDetail(albumKey);

    req
      .then((res) => {
        const detail = res?.data?.data ?? res?.data ?? res ?? {};
        setAlbumDetail(detail);
      })
      .catch((err) => {
        console.error(err);
        setAlbumDetail({});
      })
      .finally(() => setPageLoading(false));
  }, [albumKey, selectedAlbumId]);

  const brandColor = albumDetail?.color || "#6b7280";

  return (
    <div className={styles.AlbumPage}>
      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners size={28} label="앨범 정보 불러오는 중..." color={brandColor} showLabel position="container" />
        )}

        <div className={styles.information} aria-busy={pageLoading}>
          <div className={styles.groupimg}>
            {albumDetail?.images ? (
              <img
                src={albumDetail.images}
                alt={albumDetail.name || "album image"}
                loading="lazy"
              />
            ) : (
              <div className={styles.imgPlaceholder} />
            )}
          </div>

          <div className={styles.text}>
            {/* 앨범 선택 */}
            <select
              value={selectedAlbumId ?? ""}
              onChange={(e) =>
                setSelectedAlbumId(e.target.value ? Number(e.target.value) : null)
              }
              className={styles.albumSelect}
            >
              {uniqueAlbumList.length === 0 ? (
                <option value="">앨범이 없어요</option>
              ) : (
                uniqueAlbumList.map((a) => (
                  <option key={a.albumId} value={a.albumId}>
                    {a.albumname} ({a.Releasedate ?? "-"})
                  </option>
                ))
              )}
            </select>

            <h1>💿 {albumDetail?.name ?? "—"}</h1>
            <p>타이틀 - &nbsp;{albumDetail?.title?? "—"}</p>
            <p>발매일 - &nbsp;{albumDetail?.releaseDate ?? "—"}</p>
          </div>

          <button
            className={styles.homeIcon}
            onClick={goIndex}
            aria-label="홈으로"
          >
            <FontAwesomeIcon icon={faHouse} size="2xl" />
          </button>
        </div>
      </section>

      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners
            size={24}
            label="유튜브 불러오는 중..."
            showLabel
            color={brandColor}
            position="container"
          />
        )}
        <ContentTable
          title="유튜브"
          iconList={[faYoutube]}
          data={albumDetail?.Youtube || []}
          emptyText="공개된 유튜브 콘텐츠가 없어요 📺"
        />
      </section>

      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners
            size={24}
            label="음악방송 불러오는 중..."
            showLabel
            color={brandColor}
            position="container"
          />
        )}
        <ContentTable
          title="음악방송"
          iconList={[faMusic, faTv]}
          data={albumDetail?.musicbroadcast || []}
          emptyText="음악방송 출연 영상이 아직 없어요 🎤"
        />
      </section>

      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners
            size={24}
            label="직캠 불러오는 중..."
            showLabel
            color={brandColor}
            position="container"
          />
        )}
        <ContentTable
          title="음악방송 - 직캠"
          iconList={[faVideo]}
          data={albumDetail?.fancam || []}
          emptyText="공개된 직캠 영상이 없어요 🎥"
        />
      </section>

      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners
            size={24}
            label="라디오 불러오는 중..."
            showLabel
            color={brandColor}
            position="container"
          />
        )}
        <ContentTable
          title="라디오"
          iconList={[faRadio]}
          data={albumDetail?.radio || []}
          emptyText="라디오 출연 기록이 아직 없어요 📻"
        />
      </section>

      <section style={{ position: "relative" }}>
        {pageLoading && (
          <Spinners
            size={24}
            label="TV프로그램 불러오는 중..."
            showLabel
            color={brandColor}
            position="container"
          />
        )}
        <ContentTable
          title="TV프로그램"
          iconList={[faTv]}
          data={albumDetail?.tvshow || []}
          emptyText="TV 프로그램 출연 정보가 없어요 📺"
        />
      </section>
    </div>
  );
}

export default AlbumPage;