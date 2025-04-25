import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between items-center border-b py-3">
              <div>
                <p className="font-semibold">{item.bookTitle}</p>
                <p>₹ {item.bookPrice}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
