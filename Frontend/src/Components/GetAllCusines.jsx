import axios from "axios";
import React, { useEffect, useState } from "react";

const GetAllCusines = () => {
  const [cusines, setCusines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCusines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4444/food/getAllCusineCategories"
        );
        console.log(response.data.data);
        setCusines(response.data.data);
      } catch (error) {
        console.log(error.message);
        setError("Failed to get cusines");
      } finally {
        setLoading(false);
      }
    };
    fetchCusines();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div>
      <h3 className="mx-6">Inspiration for your first order</h3>
      <ul className="flex flex-wrap list-none">
        {cusines.map((cusine) => (
          <li key={cusine._id} className="flex flex-col items-center">
            <div className="overflow-hidden rounded-full shadow-lg">
              <img className="w-[200px] h-[200px] mx-[12px] object-cover rounded-full" src={`http://localhost:4444${cusine.image}`} alt={cusine.name}/>
            </div>
            <h3>
              {cusine.cusineCategory}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllCusines;

