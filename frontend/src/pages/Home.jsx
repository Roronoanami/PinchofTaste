import React from 'react'
import MainBranner from '../components/MainBranner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewLetter from '../components/NewLetter'
// import Footer from '../components/Footer'

// import Time from '../components/Time'

const Home = () => {
  return (
    <div className='mt-10'>
      
        <MainBranner />
        <Categories />

        {/* <Time /> */}
        <BestSeller/>
        <BottomBanner />
        <NewLetter />
        {/* <Footer /> */}
       
    </div>
  )
}

export default Home
