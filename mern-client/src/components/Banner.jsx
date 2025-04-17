import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        
        <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-bold leading-snug text-black'>Book Rental <span className='text-red-700'>choose your book, choose your price!</span></h2>
            <p className='md: w-4/5'>Ever found books too expensive? Or did you ever feel like you have too many books laying around? Why not rent them to others and earn some cash?</p>
            
        </div>

        <div>
            <BannerCard/>
        </div>
      </div>
    </div>
  )
}

export default Banner
