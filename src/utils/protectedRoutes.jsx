import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./cookies";

const ProtectedRoutes = () => {
  const token = getToken();
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoutes;


