import React, { useContext, useEffect, useState} from 'react';
import { Card, Modal, Button } from "flowbite-react";
import { AuthContext } from '../context/AuthProvider';

import SingleBook from './SingleBook';
import { Link } from 'react-router-dom';

const Shop = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  
useEffect(() => {
  const fetchBooks = async () => {
    let url = "http://localhost:5000/all-books";
    if (user?.email) {
      url += `?email=${user.email}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setBooks(data);
  };

  fetchBooks();
}, [user]);
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => <Card key={book._id} className="  max-w-sm bg-white shadow-lg "  horizontal>
            <img src={book.imageURL} className='h-96'/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-white">
             
            {book.bookTitle}
            </h5>
            <p className="text-2xl font-bold tracking-tight text-gray-900 text-white">
             
            Rs. {book.bookPrice}
            </p>

            

            <Link to={`/book/${book._id}`}>
            <button className='bg-red-700 font-semibold text-white py-2 my-3 rounded w-full'>
            Rent
            </button>
            </Link>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Shop
