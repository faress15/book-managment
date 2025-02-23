import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isAdmin }),
    });

    const data = await response.json();
    if (data.success) {
      setMessage("user added successfully");
      if (isAdmin) {
        navigate("/adminhome");
      } else {
        navigate("/usershome");
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>singup</h2>
        {error && <p className="error-message">{error}</p>}
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          Register as Admin
        </label>
        <button type="submit">signup</button>
      </form>
    </div>
  );
};

export default SignUp;
