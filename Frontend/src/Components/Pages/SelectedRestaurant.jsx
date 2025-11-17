import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SelectedRestaurant = () => {
  const {id} = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const GetRestaurantById = async (restaurantId) => {
    const response = await axios.get(
      `http://localhost:4444/api/restaurants/${restaurantId}`
    );
    console.log(response.data.restaurant);
    setSelectedRestaurant(response.data.restaurant);
  };
  useEffect(()=>{
    GetRestaurantById(id);
  })
  return (
    <div>
      {selectedRestaurant && (
        <div>
          <h1 className="font-bold text-[25px] capitalize">{selectedRestaurant.name}</h1>
          <img
            className="w-25"
            src={`http://localhost:4444${selectedRestaurant.image}`}
            alt={selectedRestaurant.name}
          />
          <p>{selectedRestaurant.address}</p>
          <p>{selectedRestaurant.contact}</p>
          <p>{selectedRestaurant.email}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedRestaurant;
