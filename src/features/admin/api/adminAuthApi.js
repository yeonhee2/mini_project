// 모든 내부 import는 alias(@/)로 통일, 상대경로는 같은 폴더 / 바로 아래만
import requestHandler from "@/api/requestHandler";

// 로그인 (formLogin이니까 contentType: "form")
export const adminLogin = (email, password, opts = {}) =>
  requestHandler({
    method: "post",
    url: "/api/admin/auth/login",
    payload: { email, password },
    contentType: "form",
    ...opts,
  });

// 로그아웃
export const adminLogout = (opts = {}) =>
  requestHandler({
    method: "post",
    url: "/api/admin/auth/logout",
    ...opts,
  });

// 내 정보
export const fetchAdminMe = (opts = {}) =>
  requestHandler({
    method: "get",
    url: "/api/admin/me",
    params: { _ts: Date.now() },
    ...opts,
  });

// 비밀번호 변경
export const changeAdminPassword = (payload, opts = {}) =>
  requestHandler({
    method: "post",
    url: "/api/admin/change-password",
    payload,
    ...opts,
  });