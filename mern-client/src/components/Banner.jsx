import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        
        <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-bold leading-snug text-black'>Book Rental <span className='text-red-700'>choose your book, choose your price!</span></h2>
            <p className='md: w-4/5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium natus quia animi ipsum, quos quaerat repudiandae sunt! Dolore odio, tenetur quia architecto nulla consequuntur ipsam, praesentium, mollitia ab excepturi iusto?</p>
            <div>
                <input type="search" name="search" id='search' placeholder='search a book' className='py-2 px-2 rounded-s-sm outline-none'></input>
                <button className='bg-red-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Search</button>
            </div>
        </div>

        <div>
            <BannerCard/>
        </div>
      </div>
    </div>
  )
}

export default Banner
