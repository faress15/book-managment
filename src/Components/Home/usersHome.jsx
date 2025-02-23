import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./usersHome.css";

const usershome = () => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/");
  //     return;
  //   }
  //   fetch("http://localhost:3000/user", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.user))
  //     .catch(() => navigate("/"));
  // }, [navigate]);

  return (
    <div className="home-container">
      <h2>home page</h2>
      {user ? <p>welcome, {user.name}!</p> : <p>loading.....</p>}
    </div>
  );
};

export default usershome;
