import { useEffect, useState } from "react";
import "./MyAccount.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EditUser } from "../../interfaces/interfaces";
import { selectToken, selectUserId } from "../../features/auth/authSelectors";
import { setAuth } from "../../features/auth/authSlice";
import { getUser, updateUser } from "../../features/users/usersThunks";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const loadUser = async () => {
      if (token && userId) {
        const res = await dispatch(getUser(userId));
        if (getUser.fulfilled.match(res)) {
          setName(res.payload.name);
          setEmail(res.payload.email);
        } else {
          setError("❌ Failed to load user data.");
        }
      }
    };

    loadUser();
  }, [token, userId, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim()) {
      setError("❌ Name and email cannot be empty.");
      return;
    }

    if (!validateEmail(email)) {
      setError("❌ Please enter a valid email address.");
      return;
    }

    if (password && password.length < 6) {
      setError("❌ Password must be at least 6 characters.");
      return;
    }

    const updateData: Partial<EditUser> = {
      name: name.trim(),
      email: email.trim(),
      ...(password && { password }),
    };

    if (token && userId) {
      const res = await dispatch(updateUser({ userId, token, updateData }));

      if (updateUser.fulfilled.match(res)) {
        setSuccess("✅ Your account has been updated!");

        dispatch(
          setAuth({
            token,
            name: res.payload.name,
            email: res.payload.email,
            role: res.payload.role,
            sub: res.payload._id,
          })
        );
      } else {
        setError("❌ Failed to update your account. Please try again.");
      }
    }
  };

  return (
    <div className="accountContainer">
      <form onSubmit={handleSubmit} className="accountForm">
        {error && <p className="formError">{error}</p>}
        {success && <p className="formSuccess">{success}</p>}

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </label>

        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default MyAccount;

// import { useEffect, useState } from "react";
// import "./MyAccount.css";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { EditUser } from "../../interfaces/interfaces";
// import { selectToken, selectUserId } from "../../features/auth/authSelectors";
// import { setAuth } from "../../features/auth/authSlice";
// import { fetchUserById, updateUser } from "../../features/users/usersThunks";

// const MyAccount = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const token = useAppSelector(selectToken);
//   const userId = useAppSelector(selectUserId);
//   const dispatch = useAppDispatch();

//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   useEffect(() => {
//     const loadUser = async () => {
//       if (token && userId) {
//         const res = await dispatch(fetchUserById({ userId, token }));
//         if (fetchUserById.fulfilled.match(res)) {
//           setName(res.payload.name || "");
//           setEmail(res.payload.email || "");
//         } else {
//           console.error("Failed to load user info");
//         }
//       }
//     };

//     loadUser();
//   }, [token, userId, dispatch]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!name.trim() || !email.trim()) {
//       setError("❌ Name and email cannot be empty.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("❌ Please enter a valid email address.");
//       return;
//     }

//     if (password && password.length < 6) {
//       setError("❌ Password must be at least 6 characters.");
//       return;
//     }

//     const updateData: Partial<EditUser> = {};
//     if (name.trim()) updateData.name = name.trim();
//     if (email.trim()) updateData.email = email.trim();
//     if (password.trim()) updateData.password = password;

//     const res = await dispatch(
//       updateUser({ userId: userId!, token: token!, updateData })
//     );
//     if (updateUser.fulfilled.match(res)) {
//       setSuccess("✅ Your account has been updated!");

//       dispatch(
//         setAuth({
//           token: token!,
//           name: res.payload.name || name,
//           email: res.payload.email || email,
//           role: res.payload.role ?? null,
//           sub: res.payload.id,
//         })
//       );
//     } else {
//       setError("❌ Failed to update your account. Please try again.");
//     }
//   };

//   return (
//     <div className="accountContainer">
//       <form onSubmit={handleSubmit} className="accountForm">
//         {error && <p className="formError">{error}</p>}
//         {success && <p className="formSuccess">{success}</p>}

//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="******"
//           />
//         </label>

//         <button type="submit">Update Account</button>
//       </form>
//     </div>
//   );
// };

// export default MyAccount;
