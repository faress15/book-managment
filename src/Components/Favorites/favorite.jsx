import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorite.css"; // استایل دلخواه خود را در این فایل اضافه کن

const Favorite = () => {
  const [favorites, setFavorite] = useState([]);
  const navigate = useNavigate();
  const isFavorite = false;

  // بررسی وضعیت ورود کاربر (توکن در localStorage)
  useEffect(() => {
    checkAuth();
    fetchFavorite();
  }, []);

  // بررسی ورود کاربر
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // به صفحه اصلی بروید اگر کاربر وارد نشده باشد
    }
  };

  // درخواست گرفتن لیست کتاب‌های لایک شده (از سرور)
  const fetchFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/favorites/${userId}`);
      const favoritesData = await response.json();
        setFavorite(favoritesData.data); // ذخیره کتاب‌های لایک شده
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
