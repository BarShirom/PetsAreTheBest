import { Outlet } from "react-router-dom";
import AdminNavbar from "../navbar/AdminNavbar";
import "./AdminLayout.css"

const AdminLayout = () => {
  return (
    <div className="adminLayout">
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
