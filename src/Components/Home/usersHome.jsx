import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./usersHome.css";

const UsersHome = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const isFavorite = false;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBooks();
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };


  const handleToggleFavorite = async (bookId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, bookId: bookId })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding/removing from favorites:", error);
    }
  };

  const handleAddToShoppingList = async (bookId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/shopping-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          bookId: bookId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        alert(data.message);
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };


  return (
    <div className="users-home-container">
      <div className="book-list">
        <h2>All Books</h2>
        <nav className="navbar">
          <Link to="/usershome">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorite">Favorites</Link>
          <Link to="/shopping">Shopping List</Link>
        </nav>
        <ul>
          {books.map((book) => {


            return (
              <li key={book.id}>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Price:</strong> ${book.price}</p>

                <button onClick={() => handleToggleFavorite(book.id)}>
                  {isFavorite ? "Unlike" : "Like"}
                </button>
                <button onClick={() => handleAddToShoppingList(book.id)}>
                  Add to Shopping List
                </button>
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  );
};

export default UsersHome;
