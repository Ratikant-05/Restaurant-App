import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetAllFoodItems = () => {

  const [getAllFoodItems, setAllFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  useEffect(() => {
    const fetchAllFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:4444/food/get-all-food-items")
        setAllFoodItems(response.data.data)
        setError(null)
      } catch (error) {
        console.error(error)
        setError("Cannot Get Food Items")
        setAllFoodItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllFoodItems()
  }, [])

  if(loading) {
    return <h3>Loading...</h3>
  }

  if(error) {
    return <h3>{error}</h3>
  }

  const getFoodItemById = async (foodId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4444/food/get-food-item/${foodId}`);
      setSelectedFoodItem(response.data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch food item details");
      setSelectedFoodItem(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 className='heading'>ALL FOOD ITEMS</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {getAllFoodItems.map((foodItem) => (
            <li 
              key={foodItem._id} 
              onClick={() => getFoodItemById(foodItem._id)}
              style={{ 
                cursor: 'pointer', 
                padding: '10px',
                margin: '5px 0',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            >
              <strong>{foodItem.name}</strong> - 
              {foodItem.cusineCategory} - 
              {foodItem.description} - 
              ₹{foodItem.price}
            </li>
          ))}
        </ul>
      </div>

      {selectedFoodItem && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Selected Food Item Details</h3>
          <p><strong>Name:</strong> {selectedFoodItem.name}</p>
          <p><strong>Category:</strong> {selectedFoodItem.cusineCategory}</p>
          <p><strong>Description:</strong> {selectedFoodItem.description}</p>
          <p><strong>Price:</strong> ₹{selectedFoodItem.price}</p>
          <p><strong>Restaurant:</strong> {selectedFoodItem.restaurantId?.name || 'N/A'}</p>
          <p><strong>Restaurant Address:</strong> {selectedFoodItem.restaurantId?.address || 'N/A'}</p>
        </div>
      )}
    </div>
  )
}

export default GetAllFoodItems
