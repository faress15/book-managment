import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./shoppingList.css";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    checkAuth();
    fetchShoppingList();
  }, []);


  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  };


  const fetchShoppingList = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/shopping-list/${userId}`);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setShoppingList(data.data);
        calculateTotalPrice(data.data);
      }
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };


  const calculateTotalPrice = (list) => {
    const total = list.reduce((sum, book) => sum + parseFloat(book.price), 0);
    setTotalPrice(total);
  };

  const handleRemoveFromShoppingList = async (shoppingListId) => {
    try {
      const response = await fetch(`${API_URL}/shopping-list/${shoppingListId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert(data.message);
        calculateTotalPrice(data.data);
        setShoppingList(prevList => prevList.filter(item => item.id !== shoppingListId));
      } else {
        const error = await response.json();
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };

  return (
    <div className="shopping-list-container">
      <h2>Shopping List</h2>
      <nav className="navbar">
        <Link to="/usershome">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favorite">Favorites</Link>
        <Link to="/shopping">Shopping List</Link>
      </nav>
      {shoppingList.length === 0 ? (
        <p>No books in your shopping list</p>
      ) : (
        <ul>
          {shoppingList.map((item) => (
            <li key={item.id}>
              <p><strong>Title:</strong> {item.title}</p>
              <p><strong>Author:</strong> {item.author}</p>
              <p><strong>Price:</strong> ${item.price}</p>

              <button onClick={() => handleRemoveFromShoppingList(item.id)}>
                Remove from Shopping List
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default ShoppingList;
