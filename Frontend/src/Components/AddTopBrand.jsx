import axios from "axios";
import React, { useState } from "react";

const AddTopBrand = () => {
  const [brand, setBrand] = useState({
    name: "",
    image: null,
    restaurantId: "",
    ownerId: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setBrand({
      ...brand,
      [name]: value,
    });
  };

  // Image saving
  const onFileChange = (event) => {
    setBrand({
      ...brand,
      image: event.target.files[0]
    })
  };

  const validateForm = () => {
    if (!brand.name || !brand.restaurantId || !brand.ownerId) {
      setError("Please fill in all required fields");
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
        "http://localhost:4444/food/add-top-brands",
        brand,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMessage("Brand Saved Successfully!");
      setBrand({
        name: "",
        image: null,
        restaurantId: "",
        ownerId: "",
      });
      console.log(response.data)
    } catch (error) {
      const errorMsg = "Unable to add Brand";
      setError(errorMsg);
    }
  };

  return (  
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={brand.name}
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
          value={brand.restaurantId}
          onChange={onChange}
        />
        <input
          name="ownerId"
          placeholder="Owner Id"
          value={brand.ownerId}
          onChange={onChange}
        />
        <button type="submit">Add Brand</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default AddTopBrand;