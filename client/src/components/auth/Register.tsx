import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { registerThunk } from "../../features/auth/authThunks";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        registerThunk({ name, email, password, role: "user" })
      );

      if (registerThunk.fulfilled.match(resultAction)) {
        navigate("/products");
      } else {
        console.error("Register failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>

      <div>
        <p>Already have an account?</p>
        <button onClick={() => navigate("/")}>go to login</button>
      </div>
    </div>
  );
};

export default Register;
