import { useEffect, useState } from "react";
import { fetchAdminMe } from "../api/adminAuthApi";

export default function useAdminMe() {
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(true);

  const refreshMe = async () => {
    setLoading(true);
    const res = await fetchAdminMe();
    setMe(res?.ok ? res.data : null);
    setLoading(false);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetchAdminMe();
      if (!alive) return;
      setMe(res?.ok ? res.data : null);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  return { me, loading, refreshMe };
}