import { useEffect, useMemo, useState } from "react";
import { fetchArtistOptions } from "@/features/admin/api/optionApi";
import useAssetTargetOptions from "@/features/admin/hooks/useAssetTargetOptions";

export default function useAssetFilters({
  initialTargetType = "GROUP",
  initialImageType = "LOGO",
  excludeGroupNamesLower = ["idol-note"],
} = {}) {
  const [targetType, setTargetType] = useState(initialTargetType);
  const [imageType, setImageType] = useState(initialImageType);

  // MEMBER/UNIT에서 그룹 먼저 선택
  const [artistId, setArtistId] = useState(null);

  // 실제 조회할 targetId
  const [targetId, setTargetId] = useState(null);

  // 그룹 옵션
  const [artistOptions, setArtistOptions] = useState([]);
  const [artistLoading, setArtistLoading] = useState(false);

  // artists 로딩(1회)
  useEffect(() => {
    let alive = true;

    (async () => {
      setArtistLoading(true);
      const res = await fetchArtistOptions();
      if (!alive) return;

      const list = res?.ok ? (res.data || []) : [];
      const filtered = list.filter((a) => {
        const n = (a.groupName || "").toLowerCase();
        return !excludeGroupNamesLower.includes(n);
      });

      setArtistOptions(filtered);
      setArtistLoading(false);

      // 최초 기본값
      if (filtered.length > 0) {
        setTargetId((prev) => prev ?? filtered[0].artistId);
        setArtistId((prev) => prev ?? filtered[0].artistId);
      }
    })();

    return () => {
      alive = false;
    };
  }, [excludeGroupNamesLower]);

  // targetType별 대상 옵션(멤버/유닛)
  const { options: targetOptions, loading: targetLoading } =
    useAssetTargetOptions({ targetType, artistId });

  // targetType 바뀌면 기본값/초기화 정책
  useEffect(() => {
    if (targetType === "GROUP") {
      setTargetId((prev) => prev ?? (artistOptions[0]?.artistId ?? null));
      return;
    }

    if (!artistId && artistOptions.length > 0) {
      setArtistId(artistOptions[0].artistId);
    }

    // MEMBER/UNIT이면 대상 다시 고르게
    setTargetId(null);
  }, [targetType]); // eslint-disable-line react-hooks/exhaustive-deps

  //  MEMBER/UNIT: 옵션 로드되면 첫 대상 자동선택
  useEffect(() => {
    if (targetType === "GROUP") return;
    if (!targetOptions || targetOptions.length === 0) return;

    setTargetId((prev) => {
      if (prev) return prev;
      if (targetType === "MEMBER") return targetOptions[0].memberPk;
      if (targetType === "UNIT") return targetOptions[0].unitId;
      return null;
    });
  }, [targetType, targetOptions]);

  useEffect(() => {
    if (targetType === "MEMBER" && imageType !== "PROFILE") {
      setImageType("PROFILE");
    }
  }, [targetType]);

  // query (없으면 null)
  const query = useMemo(() => {
    if (!targetType || !targetId || !imageType) return null;
    return { targetType, targetId, imageType };
  }, [targetType, targetId, imageType]);

  return {
    // state
    targetType,
    imageType,
    artistId,
    targetId,

    // setters
    setTargetType,
    setImageType,
    setArtistId,
    setTargetId,

    // options
    artistOptions,
    artistLoading,
    targetOptions,
    targetLoading,

    // derived
    query,
  };
}
