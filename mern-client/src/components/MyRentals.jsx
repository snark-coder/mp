import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const MyRentals = () => {
  const { user } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`http://localhost:5000/my-rentals/${user.uid}`)
        .then(res => setRentals(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleReturn = async (rentalId) => {
    try {
      const response = await axios.post(`http://localhost:5000/return/${rentalId}`);
      if (response.status === 200) {
        setRentals(prev =>
          prev.map(rental =>
            rental.rentalId === rentalId
              ? { ...rental, status: 'returned', returnDate: new Date() }
              : rental
          )
        );
        alert("Book returned successfully!");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return the book. Please try again.");
    }
  };

  return (
    <div className="mt-24 px-4 lg:px-24">
      <h2 className="text-3xl font-semibold mb-8 text-center">📚 My Rentals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentals.map(rental => (
  <div
    key={rental.rentalId}
    className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
  >
    {rental.status === 'returned' && (
  <button
    onClick={async () => {
      try {
        await axios.delete(`http://localhost:5000/rental/${rental.rentalId}`);
        setRentals(prev => prev.filter(r => r.rentalId !== rental.rentalId));
      } catch (error) {
        console.error("Error deleting rental:", error);
      }
    }}
    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
    title="Delete Rental"
  >
    delete
  </button>
)}


    <img
      src={rental.book.imageURL}
      alt={rental.book.title}
      className="w-full h-56 object-cover rounded-xl mb-4"
    />

    <div className="flex-1">
      <h3 className="text-xl font-semibold mb-2">{rental.book.title}</h3>
      <p><span className="font-medium">Status:</span> {rental.status}</p>
      <p><span className="font-medium">Rented on:</span> {new Date(rental.rentStartDate).toDateString()}</p>
      <p><span className="font-medium">Due Date:</span> {rental.dueDate ? new Date(rental.dueDate).toDateString() : "N/A"}</p>

      {rental.status === 'returned' && (
        <p className="text-green-600 mt-2 font-medium">✅ Returned on: {new Date(rental.returnDate).toDateString()}</p>
      )}
    </div>

    {rental.status !== 'returned' && (
      <button
        onClick={() => handleReturn(rental.rentalId)}
        className="mt-4 w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
      >
        Return Book
      </button>
    )}
  </div>
))}

      </div>
    </div>
  );
};

export default MyRentals;
