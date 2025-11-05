import axios from "axios";
import React, { useState } from "react";

const PostFoodItem = () => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    cusineCategory: "",
    description: "",
    price: "",
    image: null,
    restaurantId: "",
    ownerId: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setFoodItem({
      ...foodItem,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    });
  };

  // Image saving
  const onFileChange = (event) => {
    setFoodItem({
      ...foodItem,
      image: event.target.files[0]
    })
  };

  const validateForm = () => {
    if (!foodItem.name || !foodItem.cusineCategory || !foodItem.price || !foodItem.restaurantId || !foodItem.ownerId) {
      setError("Please fill in all required fields");
      return false;
    }
    if (isNaN(foodItem.price) || foodItem.price <= 0) {
      setError("Please enter a valid price");
      return false;
    }
    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4444/food/add-food-item",
        foodItem,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMessage("Food Item Saved Successfully!");
      setFoodItem({
        name: "",
        cusineCategory: "",
        description: "",
        price: "",
        image: null,
        restaurantId: "",
        ownerId: "",
      });
      console.log(response.data)
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.response?.data?.error || "Unable to save food item";
      setError(errorMsg);
    }
  };

  return (  
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={foodItem.name}
          onChange={onChange}
        />
        <input
          name="cusineCategory"
          placeholder="Cusine Category"
          value={foodItem.cusineCategory}
          onChange={onChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={foodItem.description}
          onChange={onChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={foodItem.price}
          onChange={onChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
          />
        <input
          name="restaurantId"
          placeholder="Restaurant Id"
          value={foodItem.restaurantId}
          onChange={onChange}
        />
        <input
          name="ownerId"
          placeholder="Owner Id"
          value={foodItem.ownerId}
          onChange={onChange}
        />
        <button type="submit">Add Food Item</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default PostFoodItem;