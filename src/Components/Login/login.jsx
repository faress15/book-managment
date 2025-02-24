import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      const userId = decodedToken.id; 
      localStorage.setItem("userId", userId);
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
      localStorage.setItem("isAdmin", tokenPayload.isAdmin);
      if (tokenPayload.isAdmin) {
        navigate("/adminhome");
      } else {
        navigate("/usershome");
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>login</h2>
        {error && <p className="error-message">{error}</p>}
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">login</button>
        <p>
          don't have account?   <a href="/signup">signup</a>
        </p>

      </form>
    </div>
  );
};

export default Login;
