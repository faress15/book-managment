import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorite.css"; 


const Favorite = () => {
  const [favorites, setFavorite] = useState([]);
  const navigate = useNavigate();
  const isFavorite = false;
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    checkAuth();
    fetchFavorite();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
    }
  };

  const fetchFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/favorites/${userId}`);
      const favoritesData = await response.json();
        setFavorite(favoritesData.data); 
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Books</h2>
      <nav className="navbar">
        <a href="/usershome">Home</a>
        <a href="/search">Search</a>
        <a href="/favorite">Favorites</a>
        <a href="/shopping">Shopping List</a>
      </nav>
      <ul>
        {favorites.length === 0 ? (
          <p>No favorite books found!</p>
        ) : (
          favorites.map((book) => (
            <li key={book.id}>
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <button onClick={() => handleToggleFavorite(book.id)}>
                    {isFavorite ? "Unlike" : "Like"}
                </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Favorite;
