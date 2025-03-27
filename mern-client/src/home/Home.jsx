import React from 'react'
import Banner from '../components/Banner'

import BestSellerBook from './BestSellerBook'
import FaveBook from './FaveBook'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'


const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerBook/>
      <FaveBook/>
      <PromoBanner/>
      <OtherBooks/>
    </div>
  )
}

export default Home
