import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function RequireAuth() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
