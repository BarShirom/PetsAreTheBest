import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectToken, selectRole } from "../../features/auth/authSelectors";

const AdminRoute = () => {
  const token = useAppSelector(selectToken);
  const role = useAppSelector(selectRole);

  if (!token || role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
