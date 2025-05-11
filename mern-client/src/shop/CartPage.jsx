import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  //const { cartItems } = useCart();  // cartItems = array of IDs
  const [books, setBooks] = useState([]);
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBooks = async () => {
      if (cartItems.length > 0) {
        try {
          const ids = cartItems.map(item => item.bookId || item._id); // handle either format
          const response = await axios.get(`/cart-books?ids=${ids.join(',')}`);
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching cart books:", error);
        }
      } else {
        setBooks([]);
      }
    };

    fetchBooks();
  }, [cartItems]);

  if (books.length === 0) {
    return <div className="mt-28 px-4 lg:px-24">Your cart is empty</div>;
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(cartItems) && cartItems.map((book) => (
          
          <li key={book._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 relative">
            
            <img src={book.imageURL} alt={book.bookTitle} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{book.bookTitle}</h3>
              <p className="text-gray-600 text-sm mt-2">{book.bookDescription?.slice(0, 60)}...</p>
              <p className="text-blue-600 font-bold mt-4">₹{book.price}</p>
              
            </div>
            <button
              onClick={() => removeFromCart(book._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm z-10"
              title="Remove from cart"
            >
              delete
            </button>

            
          </li>
          
          
        ))}
        
      </ul>

      <h5 className="text-3xl font-bold mb-8">Total: {totalPrice}</h5>

      <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg" onClick={() => navigate('/checkout')}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
