import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");


    if (!verificationCode) {
      setError("enter verification code");
      return;
    }

    const verifyResponse = await fetch(`${API_URL}/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: verificationCode }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      setError("verification code is wrong");
      return;
    }


    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isAdmin }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("SIgnup was saccessfull");
      if (isAdmin) {
        navigate("/adminhome");
      } else {
        navigate("/usershome");
      }
    } else {
      setError(data.message);
    }
  };


  const handleSendCode = async () => {
    try {
      const response = await fetch(`${API_URL}/send-verification-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        setShowVerification(true);
      }
    } catch (error) {
      setMessage("Error sending verification code.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${API_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error verifying code.");
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
        {!showVerification && <button onClick={handleSendCode}>Send Verification Code</button>}

        {showVerification && (
          <div>
            <input type="text" placeholder="Enter Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <button onClick={handleSendCode}>Send Verification Code</button>
          </div>
        )}

        {message && <p>{message}</p>}
        <p>
          you already have an account?   <a href="/">login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
