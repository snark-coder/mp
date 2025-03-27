import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
    const {_id, bookTitle, imageURL, bookPrice} = useLoaderData();
  return (
    <div className='mt-28 px-4 lg:px-24'>
        <img src={imageURL}/>
        <h2>{bookTitle}</h2>
        <p>{bookPrice}</p>
      
    </div>
  )
}

export default SingleBook
