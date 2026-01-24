import { useMemo, useState } from "react";

/**
 * rows에서 keyword로 필터링하는 공통 훅
 * matcher: (row, keywordLower) => boolean
 */
export default function useSearchFilter({ rows, matcher }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return rows;
    return rows.filter((r) => matcher(r, keyword));
  }, [rows, q, matcher]);

  return { q, setQ, filtered };
}
