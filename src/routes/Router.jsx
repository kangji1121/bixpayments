import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BoardList from "../pages/BoardList";
import BoardDetail from "../pages/BoardDetail";
import BoardCreate from "../pages/BoardCreate";
import BoardEdit from "../pages/BoardEdit";
import RequireAuth from "./RequireAuth";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/boards" element={<BoardList />} />
      <Route path="/boards/:id" element={<BoardDetail />} />

      <Route element={<RequireAuth />}>
        <Route path="/boards/new" element={<BoardCreate />} />
        <Route path="/boards/:id/edit" element={<BoardEdit />} />
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
