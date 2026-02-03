import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Wrap = styled.header`
  background: #111;
  color: #fff;
`;

const Inner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  button {
    border: 1px solid #444;
    background: transparent;
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, accessToken } = useAuthStore();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Wrap>
      <Inner>
        <Link to="/boards">bixpayments</Link>
        <Right>
          {accessToken && user ? (
            <>
              <span>
                {user.name} ({user.username})
              </span>
              <button onClick={onLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </Right>
      </Inner>
    </Wrap>
  );
}
