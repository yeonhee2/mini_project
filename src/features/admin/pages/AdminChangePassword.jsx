import { useState } from "react";
import { changeAdminPassword, fetchAdminMe } from "../api/adminAuthApi";
import Spinners from "@/components/ui/Spinner";
import styles from "../styles/Admin.module.css";
import UseNavi from "@/hooks/UseNavi";

export default function AdminChangePassword() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { goTo } = UseNavi()

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    const res = await changeAdminPassword(
      { currentPassword, newPassword },
      {
        onError: (msg) => setError(msg),
      }
    );
      

    if (res?.ok) {
      const meRes = await fetchAdminMe();
      if (meRes?.data?.mustChangePassword === false) {
        goTo("/admin", { replace: true, state: { justChangedPassword: true } });
      } else {
        setError("비밀번호 변경 반영이 확인되지 않았습니다. 새로고침 후 다시 시도해주세요.");
      }
    }

    setLoading(false);
  }

  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h2>비밀번호 변경</h2>
        <p className={styles.desc}>
          보안을 위해 처음 로그인 시 비밀번호를 변경해주세요.
        </p>

        <input
          type="password"
          placeholder="현재 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrent(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="새 비밀번호 (8자 이상)"
          value={newPassword}
          onChange={(e) => setNew(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          비밀번호 변경
        </button>
      </form>

      {loading && <Spinners position="center" />}
    </div>
  )

}