import { useState } from "react";
import axios from "axios";

const AddRestaurant = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [addRestaurant, setRestaurant] = useState({
    name: "",
    address: "",
    email: "",
    contact: "",
    cusine: "",
    restaurantStatus: true,
    coverImage: null,
    images: [],
  });

  const onChange = (e) => {
    setRestaurant({
      ...addRestaurant,
      [e.target.name]: e.target.value,
    });
  };

  const onCoverImageChange = (event) => {
    setRestaurant({
      ...addRestaurant,
      coverImage: event.target.files[0],
    });
  };

  const onMultipleImagesChange = (event) => {
    setRestaurant({
      ...addRestaurant,
      images: event.target.files,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("name", addRestaurant.name);
      formData.append("address", addRestaurant.address);
      formData.append("email", addRestaurant.email);
      formData.append("contact", addRestaurant.contact);
      formData.append("cusine", addRestaurant.cusine);
      formData.append("coverImage", addRestaurant.coverImage);
      formData.append("restaurantStatus", addRestaurant.restaurantStatus);

      if (addRestaurant.images.length > 0) {
        for (let i = 0; i < addRestaurant.images.length; i++) {
          formData.append("images", addRestaurant.images[i]);
        }
      }

      const response = await axios.post(
        `${process.env.BASE_URL}/admin/admin-register` ||
        "http://localhost:4444/admin/admin-register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccessMessage(response.data.message);

      setRestaurant({
        name: "",
        address: "",
        email: "",
        contact: "",
        cusine: "",
        restaurantStatus: "",
        coverImage: null,
        images: [],
      });

    } catch (error) {
      setError(
        "Failed to add restaurant. Please try again."
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        
        <input
          name="name"
          placeholder="Name"
          value={addRestaurant.name}
          onChange={onChange}
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={addRestaurant.email}
          onChange={onChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={addRestaurant.address}
          onChange={onChange}
        />

        <input
          name="contact"
          placeholder="Contact"
          value={addRestaurant.contact}
          onChange={onChange}
        />

        <input
          name="cusine"
          placeholder="Cuisine"
          value={addRestaurant.cusine}
          onChange={onChange}
        />

        <label>Restaurant Status:</label>
        <select
          name="restaurantStatus"
          value={addRestaurant.restaurantStatus}
          onChange={onChange}
        >
          <option value="">Select</option>
          <option value="Open">Open Now</option>
          <option value="Close">Closed</option>
        </select>

        <label>Cover Image:</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={onCoverImageChange}
        />

        <label>Gallery Images:</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={onMultipleImagesChange}
        />

        <button type="submit">Add Restaurant</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddRestaurant;
