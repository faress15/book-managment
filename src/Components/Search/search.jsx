import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("title");
    const [books, setBooks] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const API_URL = import.meta.env.VITE_API_URL;


    const handleSearch = async () => {
        if (!searchTerm) return;

        try {
            const response = await fetch(
                `${API_URL}/books/search?type=${searchType}&query=${searchTerm}`
            );
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };


    const sortBooks = (order) => {
        const sortedBooks = [...books];
        sortedBooks.sort((a, b) => {
            if (order === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setBooks(sortedBooks);
    };


    React.useEffect(() => {
        if (books.length > 0) {
            sortBooks(sortOrder);
        }
    }, [sortOrder, books]);

    return (
        <div className="search-container">
            <h2>Search Books</h2>
            <nav className="navbar">
                <Link to="/usershome">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/favorite">Favorites</Link>
                <Link to="/shopping">Shopping List</Link>
            </nav>
            <select onChange={(e) => setSearchType(e.target.value)}>
                <option value="title">Search by Title</option>
                <option value="author">Search by Author</option>
                <option value="category">Search by Category</option>
            </select>


            <input
                type="text"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>


            <button onClick={handleSearch}>Search</button>


            <div className="search-results">
                {books.length > 0 ? (
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>
                                <strong>Title:</strong> {book.title} <br />
                                <strong>Author:</strong> {book.author} <br />
                                <strong>Category:</strong> {book.category} <br />
                                <strong>Price:</strong> ${book.price}
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
