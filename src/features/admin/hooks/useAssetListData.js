import { useCallback, useEffect, useState } from "react";
import {
  fetchAssets,
  fetchPrimaryAsset,
  setPrimaryAsset,
  deleteAsset,
} from "@/features/admin/api/assetApi";

export default function useAssetListData(query) {
  const [rows, setRows] = useState([]);
  const [primary, setPrimary] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!query) {
      setRows([]);
      setPrimary(null);
      return;
    }

    setLoading(true);

    const [listRes, primaryRes] = await Promise.all([
      fetchAssets(query),
      fetchPrimaryAsset(query),
    ]);

    setRows(listRes?.ok ? (listRes.data || []) : []);
    setPrimary(primaryRes?.ok ? primaryRes.data : null);

    setLoading(false);
  }, [query]);

  useEffect(() => {
    load();
  }, [load]);

  const onDelete = useCallback(
    async (row) => {
      const res = await deleteAsset(row.imageId, false);
      if (res?.ok) await load();
    },
    [load]
  );

  const onSetPrimary = useCallback(
    async (row) => {
      const res = await setPrimaryAsset(row.imageId);
      if (res?.ok) await load();
    },
    [load]
  );

  return { rows, primary, loading, reload: load, onDelete, onSetPrimary };
}
