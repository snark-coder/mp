import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider'; // Assuming you have AuthProvider

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          // Step 1: Get the array of book IDs
          const cartRes = await axios.get(`http://localhost:5000/api/cart/${user.uid}`);
          const bookIds = cartRes.data;
  
          // Step 2: Fetch actual book data from those IDs
          if (bookIds.length > 0) {
            const booksRes = await axios.get(
              `http://localhost:5000/cart-books?ids=${bookIds.join(',')}`
            );
            setCartItems(booksRes.data); // this should now be an array of book objects
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error('Failed to fetch cart', error);
        }
      }
    };
  
    fetchCart();
  }, [user]);
  

  

  const addToCart = async (book) => {
    const userId = user?.uid;
    if (!book || !book._id || !userId) {
      console.error("Invalid book or user ID");
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:5000/api/cart/add`, {
        userId,
        bookId: book._id,  // Ensure this is a valid 24-char string
        title: book.bookTitle,
        image: book.imageURL,
        price: book.bookPrice
      });
      console.log(response.data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };
  

  const removeFromCart = async (bookId) => {
    if (!user) return;

    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${user.uid}/${bookId}`);
      // After removing, fetch updated cart
      const res = await axios.get(`http://localhost:5000/api/cart/${user.uid}`);
      setCartItems(res.data);
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
