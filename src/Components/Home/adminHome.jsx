import React, { useState, useEffect } from "react";
import "./AdminHome.css";

const adminHome = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const validateForm = () => {
    if (!title.trim() || !author.trim() || !category.trim() || !price.trim() || !publishedDate.trim()) {
      setError("Please fill all fields!");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddBook = async () => {
    if (!validateForm()) return;

    const book = {
      title,
      author,
      description,
      category,
      price,
      published_date: publishedDate
    };

    await addBook(book);
    setTitle("");
    setAuthor("");
    setDescription("");
    setCategory("");
    setPrice("");
    setPublishedDate("");
    fetchBooks();
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setCategory(book.category);
    setPrice(book.price);
    setPublishedDate(book.published_date);
  };

  const handleUpdateBook = async () => {
    if (!validateForm()) return;

    const updatedBook = {
      title,
      author,
      description,
      category,
      price,
      published_date: publishedDate,
    };

    await fetch(`${API_URL}/books/${selectedBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    setSelectedBook(null);
    fetchBooks();
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
    setTitle("");
    setAuthor("");
    setDescription("");
    setCategory("");
    setPrice("");
    setPublishedDate("");
  };


  const addBook = async (book) => {
    await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    fetchBooks(); 
  };

  const deleteBook = async (book) => {
    try {
      const response = await fetch(`${API_URL}/books/${book.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      fetchBooks(); 
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  

  const updateBook = async (bookId, updateData) => {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
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
    <div className="admin-home-container">
      <h1>Library Manager</h1>

      {selectedBook ? (
        <div id="edit-form">
          <h2>Edit Book</h2>
          <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
          <button onClick={handleUpdateBook}>Update Book</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div id="book-form">
          <h2>Add Book</h2>
          <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
          <button onClick={handleAddBook}>Add Book</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      <ul id="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Published Date:</strong> {book.published_date}</p>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                  deleteBook(book);
                }
              }}
            >
              Delete
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleEditBook(book); }}>Edit</button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default adminHome;
