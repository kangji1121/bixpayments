import { useState } from "react";
import * as S from "./Login.styles";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginApi({ username, password });
      setTokens(res.data);
      navigate("/boards");
    } catch (error) {
      console.error("login error", error);
      alert("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrap>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <S.Input
          placeholder="이메일"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </S.Button>
      </form>
    </S.Wrap>
  );
}
