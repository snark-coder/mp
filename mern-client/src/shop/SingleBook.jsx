import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const SingleBook = () => {
  const { user } = useContext(AuthContext);
  const { _id, bookTitle, imageURL, bookPrice, bookDescription, ownerId } = useLoaderData();

  const handleRent = async () => {
    if (!user) {
      alert("Please log in to rent a book.");
      return;
    }

    const rentData = {
      bookId: _id,
      renterId: user.uid,
      rentDurationDays: 5
    };

    try {
      const res = await fetch("http://localhost:5000/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rentData)
      });

      const result = await res.json();

      if (res.ok) {
        alert("Book rented successfully!");
      } else {
        alert(result.message || "Failed to rent book.");
      }

    } catch (err) {
      console.error("Error renting book:", err);
      alert("An error occurred while renting.");
    }
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <img src={imageURL} alt={bookTitle} className="w-full lg:w-1/3 rounded shadow" />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{bookTitle}</h2>
          <p className="text-xl font-semibold text-green-700">Rs.{bookPrice}</p>
          <p className="text-gray-700">{bookDescription}</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={handleRent}
          >
            Rent for a week
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
