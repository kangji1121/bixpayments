import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BoardList from "../pages/BoardList";
import BoardDetail from "../pages/BoardDetail";
import BoardCreate from "../pages/BoardCreate";
import BoardEdit from "../pages/BoardEdit";
import RequireAuth from "./RequireAuth";
import useAuthStore from "../store/authStore";

// 로그인 안 했을 때만 /login, /signup 접근 허용
function PublicOnly() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return accessToken ? <Navigate to="/boards" replace /> : <Outlet />;
}

export default function Router() {
  return (
    <Routes>
      {/* 비로그인: 로그인/회원가입만 노출 */}
      <Route element={<PublicOnly />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* 로그인: 나머지 모든 페이지 접근 가능 */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:id" element={<BoardDetail />} />
        <Route path="/boards/new" element={<BoardCreate />} />
        <Route path="/boards/:id/edit" element={<BoardEdit />} />
      </Route>

      {/* 그 외 모든 경로는 로그인으로 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
