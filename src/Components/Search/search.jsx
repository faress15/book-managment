import React, { useState } from "react";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `http://localhost:3000/books/search?type=${searchType}&query=${searchTerm}`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div  className="search-container">
      <h2>Search Books</h2>
      <nav className="navbar">
      <a href="/usershome">Home</a>
      <a href="/search">Search</a>
      <a href="/favorites">Favorites</a>
      <a href="/cart">Cart</a>
      </nav>
      {/* Dropdown for search type */}
      <select onChange={(e) => setSearchType(e.target.value)}>
        <option value="title">Search by Title</option>
        <option value="author">Search by Author</option>
        <option value="category">Search by Category</option>
      </select>

      {/* Input field for search */}
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <div className="search-results">
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <strong>Title:</strong> {book.title} <br />
                <strong>Author:</strong> {book.author} <br />
                <strong>Category:</strong> {book.category}
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
