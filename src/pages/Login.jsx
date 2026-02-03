import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import useAuthStore from "../store/authStore";

const Wrap = styled.div`
  max-width: 360px;
  margin: 80px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #111;
  color: #fff;
  border: none;
`;

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
    <Wrap>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="이메일"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </Wrap>
  );
}
