import { useState } from "react";
import UseNavi from "@/hooks/UseNavi";
import { adminLogin } from "../api/adminAuthApi";
import styles from "../styles/Admin.module.css";
import Spinners from "@/components/ui/Spinner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {goTo} = UseNavi();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true)
    const res = await adminLogin(email, password, {
      onError: (msg) => setError(msg),
    })
    setLoading(false)

    if (res?.ok) {
      goTo("/admin")
    }
  }

  return (
    <div className={styles.page}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h2 className={styles.title}>관리자 로그인</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          로그인
        </button>
      </form>

      {loading && <Spinners position="center" />}
    </div>
  )
}