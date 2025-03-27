import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";


const Shop = () => {
  const [books, setBooks] = useState([]);
  useEffect( ()=> {
    fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setBooks(data));
  }, [])
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => <Card key={book._id} className="max-w-sm bg-white shadow-lg"  horizontal>
            <img src={book.imageURL} className='h-96'/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-black">
             
            {book.bookTitle}
            </h5>
            

            <button className='bg-red-700 font-semibold text-white py-2 my-3 rounded'>Rent</button>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Shop
