import { useState } from "react";
import * as S from "./Signup.styles";
import { useNavigate, Link } from "react-router-dom";
import { signupApi } from "../api/auth";

function isPasswordValid(pw) {
  // 8자 이상 + 숫자 + 영문 + 특수문자(!%*#?&) 최소 1개 조합
  return (
    pw.length >= 8 &&
    /[0-9]/.test(pw) &&
    /[a-zA-Z]/.test(pw) &&
    /[!%*#?&]/.test(pw)
  );
}

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // email
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit =
    username.trim().length > 0 &&
    name.trim().length > 0 &&
    isPasswordValid(password) &&
    password === confirmPassword;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!canSubmit) {
      setErrorMsg("입력값을 다시 확인해주세요.");
      return;
    }

    setLoading(true);
    try {
      await signupApi({ username, name, password, confirmPassword });
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login");
    } catch (err) {
      console.error(
        "signup error:",
        err?.response?.status,
        err?.response?.data
      );

      const data = err?.response?.data;

      let msg = "회원가입 실패";

      if (typeof data === "string") {
        msg = data;
      } else if (Array.isArray(data)) {
        msg = data.join("\n");
      } else if (data && typeof data === "object") {
        // { field: ["message"] } 형태 처리
        const values = Object.values(data);
        if (values.every((v) => Array.isArray(v))) {
          msg = values.flat().join("\n");
        } else if (data.message) {
          msg = data.message;
        } else if (data.error) {
          msg = data.error;
        }
      }

      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrap>
      <h2>회원가입</h2>

      <form onSubmit={onSubmit}>
        <S.Field>
          <S.Label>이메일(username)</S.Label>
          <S.Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="example@bigs.or.kr"
          />
        </S.Field>

        <S.Field>
          <S.Label>이름</S.Label>
          <S.Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="사용자 이름"
          />
        </S.Field>

        <S.Field>
          <S.Label>비밀번호</S.Label>
          <S.Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 + 숫자/영문/특수문자 포함"
          />
        </S.Field>

        <S.Field>
          <S.Label>비밀번호 확인</S.Label>
          <S.Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한번 더 입력"
          />
        </S.Field>

        <S.Button disabled={!canSubmit || loading}>
          {loading ? "가입 중..." : "회원가입"}
        </S.Button>

        {errorMsg && <S.ErrorText>{errorMsg}</S.ErrorText>}

        <S.Helper>
          이미 계정이 있어? <Link to="/login">로그인</Link>
        </S.Helper>
      </form>
    </S.Wrap>
  );
}
