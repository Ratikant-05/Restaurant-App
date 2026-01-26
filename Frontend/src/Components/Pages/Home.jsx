import React from 'react'
import GetAllFoodItems from '../GetAllFoodItem'
import GetAllRestaurants from '../GetAllRestaurants'
import GetAllCusines from '../GetAllCusines'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <GetAllCusines />
      <GetAllRestaurants />
      <GetAllFoodItems />
      <Footer />
    </div>
  )
}

export default Home