import { Outlet } from "react-router-dom";
import UsersNavbar from "../navbar/UsersNavbar";
import "./UsersLayout.css";

const UsersLayout = () => {
  return (
    <div className="usersLayout">
      <UsersNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default UsersLayout;
