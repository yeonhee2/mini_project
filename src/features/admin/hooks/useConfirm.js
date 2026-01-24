import { useCallback, useState } from "react";

export default function useConfirm() {
  const [confirm, setConfirm] = useState(null);

  const openConfirm = useCallback((payload) => {
    setConfirm(payload);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirm(null);
  }, []);

  return { confirm, openConfirm, closeConfirm };
}
