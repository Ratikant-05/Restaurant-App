import React from 'react'
import GetAllFoodItems from '../GetAllFoodItem'
import GetAllRestaurants from '../GetAllRestaurants'
import GetAllCusines from '../GetAllCusines'
import ImageSlider from '../ImageSlider'

const Home = () => {
  return (
    <div>
      <ImageSlider/>
      <GetAllCusines/>
      <GetAllRestaurants/>
      <GetAllFoodItems/>
    </div>
  )
}

export default Home