import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ArtistPage from "@/features/artist/pages/ArtistPage";
import { setPageTitle } from "@/utill/setTitle";
import Spinners from "@/components/ui/Spinner";
import NotFound from "@/NotFound";

const norm = (v) => String(v ?? "").trim().toLowerCase().replace(/\s+/g, "");

function pickOne(list, groupName) {
  const arr = Array.isArray(list) ? list : [];
  const g = norm(groupName);
  return arr.find((x) => norm(x?.group) === g) || null;
}

export default function ArtistRoutePage({
  artist,
  concert,
  artistPlayList,
  album,
  groupevent,
  memevent,
}) {
  const { groupSlug, debutYmd } = useParams();
  const isLoading = artist == null; // undefined/null 일 때만 로딩

  const debutDashed = useMemo(() => {
    if (!debutYmd || debutYmd.length !== 8) return "";
    return `${debutYmd.slice(0, 4)}-${debutYmd.slice(4, 6)}-${debutYmd.slice(6, 8)}`;
  }, [debutYmd]);

  const group = useMemo(() => {
    if (!artist?.length) return null;

    const slug = norm(groupSlug);
    const ymd = String(debutYmd || "");

    return (
      artist.find((g) => {
        const gSlug = norm(g.group);
        const gId = String(g.id || "");
        const gDebut = String(g.debut || "");

        return (
          gSlug === slug &&
          (gId === ymd || gDebut === debutDashed || gDebut.replace(/-/g, "") === ymd)
        );
      }) || null
    );
  }, [artist, groupSlug, debutYmd, debutDashed]);

  const groupPlaylist = useMemo(() => {
    if (!artistPlayList?.length || !group) return null;
    return artistPlayList.find((p) => norm(p?.group) === norm(group?.group)) || null;
  }, [artistPlayList, group]);

  const performance = useMemo(() => (group ? pickOne(concert, group.group) : null), [concert, group]);
  const albumOne = useMemo(() => (group ? pickOne(album, group.group) : null), [album, group]);
  const scheduleOne = useMemo(() => (group ? pickOne(groupevent, group.group) : null), [groupevent, group]);
  const memscheduleOne = useMemo(() => (group ? pickOne(memevent, group.group) : null), [memevent, group]);

  useEffect(() => {
    setPageTitle(group?.fanclubname || group?.group || "Idol Note");
  }, [group]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "60vh", position: "relative" }}>
        <Spinners
          size={32}
          label="아티스트 정보를 불러오는 중..."
          showLabel
          position="center"
        />
      </div>
    );
  }

  if (!group) {
    return <NotFound />;
  }

  return (
    <ArtistPage
      group={group}
      performance={performance}
      suggest={groupPlaylist}
      album={albumOne}
      schedule={scheduleOne}
      memschedule={memscheduleOne}
    />
  );
}




