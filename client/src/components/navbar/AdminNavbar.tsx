import { useEffect, useState } from "react";
import { getUserById } from "../../api/usersApi";
import { AxiosError } from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectToken, selectUserId } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { User } from "../../interfaces/interfaces";

import "./Navbar.css";

const AdminNavbar = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token || !userId) return;

      try {
        const user = await getUserById(userId, token);
        setUserInfo(user);
      } catch (error) {
        const err = error as AxiosError;
        console.error("❌ Failed to load user info:", error);
        if (err.response?.status === 401) {
          dispatch(logout());
          navigate("/", { replace: true });
        }
      }
    };

    fetchUserInfo();
  }, [token, userId, dispatch, navigate]);

  return (
    <nav>
      <h1>PetsAreTheBest🐾</h1>
      <p>Welcome {userInfo?.name}😊</p>
      <Link to="/statistics">Statistics</Link>
      <Link to="/editCategories">Categories</Link>
      <Link to="/editProducts">Products</Link>
      <Link to="/users">Users</Link>

      <button
        onClick={() => {
          dispatch(logout());
          navigate("/", { replace: true });
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
