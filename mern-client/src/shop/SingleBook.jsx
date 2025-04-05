import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
    const {_id, bookTitle, imageURL, bookPrice, bookDescription} = useLoaderData();
  return (
    <div className="mt-28 px-4 lg:px-24">
  <div className="flex flex-col lg:flex-row gap-8 items-start">
    <img src={imageURL} alt={bookTitle} className="w-full lg:w-1/3 rounded shadow" />
    <div className="flex-1 space-y-4">
      <h2 className="text-3xl font-bold">{bookTitle}</h2>
      <p className="text-xl font-semibold text-green-700">Rs.{bookPrice}</p>
      <p className="text-gray-700">{bookDescription}</p>
      <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Rent for 5 days
      </button>
    </div>
  </div>
</div>
  )
}

export default SingleBook
