import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./usersHome.css";

const UsersHome = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    // Check for authentication
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    const userId = localStorage.getItem("userId");
    // fetchFavorites(userId);
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${userId}`);
      const favoritesData = await response.json();
      if (Array.isArray(favoritesData)) {
        setFavorites(favoritesData);
      } else {
        console.error("Favorites data is not an array:", favoritesData);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleToggleFavorite = async (bookId) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId }),
      });

      const data = await response.json();
      if (data.success) {
        fetchFavorites(userId);  // Update the favorite list after toggling
      }
    } catch (error) {
      console.error("Error adding/removing from favorites:", error);
    }
  };

  const updateBook = async (bookId, updateData) => {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Failed to update book");
    }
    fetchBooks();
  };

  return (
    <div className="users-home-container">
      {/* Conditional Rendering for Tabs */}
      <div className="book-list">
        <h2>All Books</h2>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/search">Search</a>
          <a href="/favorites">Favorites</a>
          <a href="/shopping">Shopping List</a>
        </nav>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              {/* <button onClick={() => handleToggleFavorite(book.id)}>
                  {favorites.some((fav) => fav.bookId === book.id) ? "Unlike" : "Like"}
                </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersHome;
