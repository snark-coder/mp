import React from 'react'
import FavBookImg from "../assets/convo-w-frnds.png"
import { Link } from 'react-router-dom'

const FaveBook = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
      <div className='md:w-1/2'>
        <img src={FavBookImg} className='rounded md:w-10/12'/>
      </div>
      <div className='md:w-1/2 space-y-6'>
        <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>Find Your Favourite <span className='text-red-700'>Books here!</span></h2>
        <p className='mb-10 text-lg md:w-5/6'>You don't have to buy expensive books anymore, you can just rent them!</p>
        <div className='flex flex-col sm:felx-row justify-between gap-6 md:w-3/4 my-14'>
            <div>
                <h3 className='text-3xl font-bold'>800+</h3>
                <p className='text-base'>Book Listings</p>
            </div>

            <div>
                <h3 className='text-3xl font-bold'>500+</h3>
                <p className='text-base'>Registered Users</p>
            </div>
            
        </div>

        <Link to="/shop" className='mt-12 block'>
        <button className='bg-red-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Explore More</button>
        </Link>
      </div>
    </div>
  )
}

export default FaveBook
