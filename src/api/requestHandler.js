import { axiosSpring } from "./axiosInstance";

const requestHandler = async ({
  method = "get",
  url,

  // ✅ 둘 다 지원
  payload,
  data,

  params,
  headers: extraHeaders,

  onSuccess,
  onError,
  setLoading,

  // "json" | "form" | "multipart"
  contentType = "json",
}) => {
  const m = (method || "get").toLowerCase();

  try {
    setLoading?.(true);

    let body = data ?? payload ?? null;
    let headers = { ...(extraHeaders || {}) };

    // ✅ form-urlencoded 처리
    if (contentType === "form") {
      const form = new URLSearchParams();
      Object.entries(body || {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null) form.append(k, String(v));
      });
      body = form;
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    // ✅ multipart 처리 (FormData면 Content-Type을 강제로 지정하지 않는게 안전)
    if (contentType === "multipart") {
      // axios가 boundary 자동 세팅하도록 두는게 베스트
      if (body instanceof FormData) {
        delete headers["Content-Type"];
      }
    }

    let res;
    if (m === "get") {
      res = await axiosSpring.get(url, { params: params ?? undefined, headers });
    } else if (m === "delete") {
      res = await axiosSpring.delete(url, { data: body, params, headers });
    } else {
      res = await axiosSpring[m](url, body, { params: params ?? undefined, headers });
    }

    const bodyRes = res.data;

    const isApiResponse =
      bodyRes &&
      typeof bodyRes === "object" &&
      Object.prototype.hasOwnProperty.call(bodyRes, "success");

    if (isApiResponse) {
      if (bodyRes.success) {
        onSuccess?.(bodyRes.data, bodyRes.message);
        return { ok: true, data: bodyRes.data, message: bodyRes.message, status: res.status };
      } else {
        const msg = bodyRes.message || "오류가 발생했습니다.";
        onError?.(msg, bodyRes);
        return { ok: false, message: msg, status: res.status };
      }
    }

    onSuccess?.(bodyRes);
    return { ok: true, data: bodyRes, status: res.status };
  } catch (err) {
    const status = err?.response?.status;
    const bodyErr = err?.response?.data;

    const msg =
      (bodyErr && typeof bodyErr === "object" && bodyErr.message) ||
      err?.message ||
      "요청 처리 중 오류가 발생했습니다.";

    onError?.(msg, err);
    return { ok: false, message: msg, status };
  } finally {
    setLoading?.(false);
  }
};

export default requestHandler;

