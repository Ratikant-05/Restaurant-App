import axios from 'axios';
import { useEffect, useState } from 'react'

const GetAllRestaurants = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant , setSelectedRestaurant] = useState(null);

  useEffect(()=>{
    const fetchRestaurants = async() => {
      try {
        const response = await axios.get("http://localhost:4444/api/restaurants")
        // console.log(response.data.restaurants)
        setRestaurants(response.data.restaurants)
      } catch (error) {
        console.log(error.message)
        setError("Failed to get Restaurants")
      }finally{
        setLoading(false)
      }
    }

    fetchRestaurants()
  },[])

  const GetRestaurantById = async (restaurantId) => {
    const response = await axios.get(`http://localhost:4444/api/restaurants/${restaurantId}`)
    console.log(response.data.restaurant)
    setSelectedRestaurant(response.data.restaurant)
  }

  if(loading){
      return <h3>Loading...</h3>
    }
  
    if(error){
      return <h3>{error}</h3>
    }

  return (
    <div>
      <h3 className='heading'>RECOMMENDED FOR YOU</h3>
      <ul>
        {restaurants.map((restaurant)=>(
        <li className='list-item' key={restaurant._id}>
          <button className='restaurant-btn' onClick={() => {GetRestaurantById(restaurant._id)}}>{restaurant.name}</button>
          <h3>{restaurant.address}</h3>
        </li>
      ))}
      </ul>

      {selectedRestaurant && (
        <div>
          <h4>Selected Restaurant Details</h4>
          <p>{selectedRestaurant.name}</p>
          <p>{selectedRestaurant.address}</p>
          <p>{selectedRestaurant.contact}</p>
          <p>{selectedRestaurant.email}</p>
        </div>
      )}
    </div>
  )
}

export default GetAllRestaurants
