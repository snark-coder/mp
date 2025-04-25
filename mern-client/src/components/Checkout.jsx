import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please enter your address.");
      return;
    }

    // Here you would send to backend if needed
    console.log("Placing order:", cartItems, "Shipping to:", address);

    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows="4"
        placeholder="Enter your shipping address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
