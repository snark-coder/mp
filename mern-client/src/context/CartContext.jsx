import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from backend on login
  useEffect(() => {
    if (user?.uid) {
      axios.get(`http://localhost:5000/cart/${user.uid}`)
        .then(res => setCartItems(res.data.items || []))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Update cart in backend
  const updateCart = async (items) => {
    setCartItems(items);
    if (user?.uid) {
      try {
        await axios.post(`http://localhost:5000/cart/${user.uid}`, { items });
      } catch (err) {
        console.error("Failed to update cart:", err);
      }
    }
  };

  const addToCart = (book) => {
    const exists = cartItems.find(item => item.bookId === book._id);
    let updatedCart;

    if (exists) {
      updatedCart = cartItems.map(item =>
        item.bookId === book._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, {
        bookId: book._id,
        quantity: 1,
        bookDetails: book,
      }];
    }

    updateCart(updatedCart);
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cartItems.filter(item => item.bookId !== bookId);
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
