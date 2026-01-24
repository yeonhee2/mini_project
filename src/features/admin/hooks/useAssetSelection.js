import { useEffect, useMemo, useState } from "react";
import { fetchArtistOptions } from "@/features/admin/api/optionApi";
import useAssetTargetOptions from "@/features/admin/hooks/useAssetTargetOptions";

export default function useAssetSelection({
  initialTargetType = "GROUP",
  initialImageType = "LOGO",
  initialArtistId = null,
  initialTargetId = null,
  excludeGroupNamesLower = ["idol-note"],
} = {}) {
  const [targetType, setTargetType] = useState(initialTargetType);
  const [imageType, setImageType] = useState(initialImageType);

  const [artistId, setArtistId] = useState(initialArtistId);
  const [targetId, setTargetId] = useState(initialTargetId);

  const [artistOptions, setArtistOptions] = useState([]);
  const [artistLoading, setArtistLoading] = useState(false);

  // 배열 deps 무한루프 방지용 키
  const excludeKey = useMemo(() => {
    const arr = Array.isArray(excludeGroupNamesLower) ? excludeGroupNamesLower : [];
    return arr.map((x) => String(x).toLowerCase()).sort().join("|");
  }, [excludeGroupNamesLower]);

  // 1) artists 로드(1회 또는 excludeKey 바뀔 때만)
  useEffect(() => {
    let alive = true;

    (async () => {
      setArtistLoading(true);
      try {
        const res = await fetchArtistOptions();
        if (!alive) return;

        const list = res?.ok ? (res.data || []) : [];
        const excludes = excludeKey ? excludeKey.split("|") : [];

        const filtered = list.filter((a) => {
          const n = String(a.groupName || "").toLowerCase();
          return !excludes.includes(n);
        });

        setArtistOptions(filtered);

        if (filtered.length === 0) return;

        const firstArtistId = filtered[0].artistId;

        // artistId 기본값
        setArtistId((prev) => prev ?? firstArtistId);

        // GROUP이면 targetId 기본값도 그룹으로
        if (initialTargetType === "GROUP") {
          setTargetId((prev) => prev ?? (initialTargetId ?? firstArtistId));
        }
      } finally {
        if (alive) setArtistLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [excludeKey, initialTargetId, initialTargetType]);

  // 2) MEMBER/UNIT 옵션 로딩
  const { options: targetOptions, loading: targetLoading } = useAssetTargetOptions({
    targetType,
    artistId,
  });

  // 3) targetType 변경 시 정책
  useEffect(() => {
    if (targetType === "GROUP") {
      const first = artistOptions[0]?.artistId ?? null;
      const nextArtist = artistId ?? first;

      if (!artistId && first) setArtistId(first);
      setTargetId(nextArtist);
      return;
    }

    // MEMBER/UNIT이면 artistId 필요
    const first = artistOptions[0]?.artistId ?? null;
    if (!artistId && first) setArtistId(first);

    // 대상은 다시 선택(옵션 로드 후 자동 선택)
    setTargetId(null);
  }, [targetType, artistOptions, artistId]);

  // 4) artistId 변경 시 정책
  useEffect(() => {
    if (!artistId) return;

    if (targetType === "GROUP") {
      setTargetId(artistId);
      return;
    }

    setTargetId(null);
  }, [artistId, targetType]);

  // 5) MEMBER/UNIT: 옵션 로드되면 첫 대상 자동 선택
  useEffect(() => {
    if (targetType === "GROUP") return;
    if (!artistId) return;
    if (!targetOptions || targetOptions.length === 0) return;

    setTargetId((prev) => {
      if (prev) return prev;
      if (targetType === "MEMBER") return targetOptions[0].memberPk;
      if (targetType === "UNIT") return targetOptions[0].unitId;
      return null;
    });
  }, [targetType, artistId, targetOptions]);

  const query = useMemo(() => {
    if (!targetType || !targetId || !imageType) return null;
    return { targetType, targetId, imageType };
  }, [targetType, targetId, imageType]);

  return {
    targetType,
    imageType,
    artistId,
    targetId,

    setTargetType,
    setImageType,
    setArtistId,
    setTargetId,

    artistOptions,
    artistLoading,
    targetOptions,
    targetLoading,

    query,
  };
}



