import { useCallback } from "react";
import { useNavigate } from "react-router-dom"

const UseNavi = () => {
  const navigate = useNavigate()

  const goIndex = useCallback((opts = {}) => {
    navigate("/", { replace: !!opts.replace });
  }, [navigate]);

  const goTo = useCallback((path, opts = {}) => {
    const { state, replace } = opts;
    navigate(path, {
      ...(state !== undefined ? { state } : {}),
      ...(replace !== undefined ? { replace: !!replace } : {}),
    });
  }, [navigate]);

  return {goIndex, goTo}
}

export default UseNavi