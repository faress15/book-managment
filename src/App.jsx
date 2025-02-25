import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/login";
import UsersHome from "./Components/Home/usersHome";
import SignUp from "./Components/SignUp/signup";
import AdminHome from "./Components/Home/adminHome";
import Search from "./Components/Search/search";
import Favorite from "./Components/Favorites/favorite";
import Shopping from "./Components/Shopping list/shopping";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usershome" element={<UsersHome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
    </Router>
  );
}

export default App;
