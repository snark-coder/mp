import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription, bookPrice} = useLoaderData();
  return (
    <div>
      
    </div>
  )
}

export default EditBooks
