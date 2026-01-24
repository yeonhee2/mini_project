import { Navigate, useLocation } from "react-router-dom";
import Spinners from "@/components/ui/Spinner";
import useAdminMe from "../hooks/useAdminMe";

export default function AdminRoute({ children }) {
  const {me, loading} = useAdminMe()

  const { pathname, state } = useLocation();

  const justChanged = state?.justChangedPassword === true;

  if (loading) {
    return <Spinners position="center" />
  }

  if (!me) {
    return <Navigate to="/admin/login" replace />
  }

  // 방금 비번 변경하고 온 이동은 1회 통과
  if (justChanged) return children;

  // 첫 로그인 → 비번 변경 강제
  // 단, 이미 change-password 페이지라면 그대로 통과시켜야 함
  if (me.mustChangePassword && !pathname.startsWith("/admin/change-password")) {
    return <Navigate to="/admin/change-password" replace />;
  }

  return children;
}