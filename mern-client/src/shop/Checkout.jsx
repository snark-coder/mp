import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cartItems } = useCart(); // cartItems = array of book IDs
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (cartItems.length > 0) {
        try {
          const response = await axios.get(`/cart-books?ids=${cartItems.join(',')}`);
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching cart books:", error);
        }
      }
    };

    fetchBooks();
  }, [cartItems]);

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const handleProceedToAddress = () => {
    navigate('/address');
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {books.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="p-4 border rounded flex gap-4 items-center">
              <img src={item.imageURL} alt={item.bookTitle} className="w-20 h-28 object-cover" />
              <div>
                <h3 className="text-xl font-semibold">{item.bookTitle}</h3>
                <p className="text-green-600 font-medium">Rs. {item.price}</p>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <h3 className="text-2xl font-bold">Total: Rs. {totalPrice}</h3>
            <button
              onClick={handleProceedToAddress}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Proceed to Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
