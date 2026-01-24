import { useEffect, useState } from "react";
import {
  fetchArtistOptions,
  fetchMemberOptions,
  fetchUnitOptions,
} from "@/features/admin/api/optionApi";

export default function useAssetTargetOptions({ targetType, artistId }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;

    // 타입/artistId 바뀌면 이전 옵션 먼저 비우기
    setOptions([]);

    async function load() {
      // MEMBER/UNIT인데 artistId 없으면 호출하지 않음
      if ((targetType === "MEMBER" || targetType === "UNIT") && !artistId) {
        if (alive) {
          setOptions([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      try {
        let res = null;

        if (targetType === "GROUP") {
          res = await fetchArtistOptions();
        } else if (targetType === "MEMBER") {
          res = await fetchMemberOptions(artistId);
        } else if (targetType === "UNIT") {
          res = await fetchUnitOptions(artistId);
        }

        if (!alive) return;

        if (res?.ok) setOptions(res.data || []);
        else setOptions([]);
      } catch (e) {
        if (!alive) return;
        setOptions([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [targetType, artistId]);

  return { options, loading };
}

