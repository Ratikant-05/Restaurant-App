import axios from "axios";
import React, { useEffect, useState } from "react";

const GetAllFoodItems = () => {
  const [getAllFoodItems, setAllFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchAllFoodItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4444/food/get-all-food-items"
        );
        setAllFoodItems(response.data.data);
        // console.log(response.data.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Cannot Get Food Items");
        setAllFoodItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFoodItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading food items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-red-700 text-lg font-semibold mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const getFoodItemById = async (foodId) => {
    try {
      setLoadingDetails(true);
      const response = await axios.get(
        `http://localhost:4444/food/get-food-item/${foodId}`
      );
      setSelectedFoodItem(response.data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch food item details");
      setSelectedFoodItem(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          All Food Items
        </h2>
        <p className="text-gray-600">
          Browse our delicious menu and click on any item to view details
        </p>
      </div>

      {getAllFoodItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No food items available at the moment.
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6"
          style={{ listStyle: "none", padding: 0 }}
        >
          {getAllFoodItems.map((foodItem) => (
            <li
              className="flex flex-col items-center cursor-pointer group"
              key={foodItem._id}
              onClick={() => getFoodItemById(foodItem._id)}
            >
              <div className="relative mb-4 transition-transform duration-300 group-hover:scale-105">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 ring-2 ring-transparent group-hover:ring-blue-500 group-hover:ring-offset-2">
                  <img
                    style={{ borderRadius: "100%" }}
                    className="w-full h-full object-cover"
                    src={`http://localhost:4444${foodItem.image}`}
                    alt={foodItem.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/120x120?text=Food";
                    }}
                  />
                </div>
              </div>

              <div className="text-center w-full px-2">
                <h3 className="text-base font-semibold text-gray-900 capitalize mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {foodItem.name}
                </h3>
                {foodItem.description && (
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {foodItem.description}
                  </p>
                )}
                <span className="text-lg font-bold text-blue-600">
                  ₹{foodItem.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {loadingDetails && (
        <div className="flex justify-center items-center py-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">Loading details...</p>
          </div>
        </div>
      )}

      {selectedFoodItem && !loadingDetails && (
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
            <h3 className="text-2xl font-bold text-white">
              Food Item Details
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Name
                </h4>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {selectedFoodItem.name}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Category
                </h4>
                <p className="text-lg text-gray-900 capitalize">
                  {selectedFoodItem.cusineCategory || "N/A"}
                </p>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Description
                </h4>
                <p className="text-base text-gray-700 leading-relaxed">
                  {selectedFoodItem.description || "No description available"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Price
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{selectedFoodItem.price}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Restaurant
                </h4>
                <p className="text-lg text-gray-900 capitalize">
                  {selectedFoodItem.restaurantId?.name || "N/A"}
                </p>
              </div>

              {selectedFoodItem.restaurantId?.address && (
                <div className="md:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Restaurant Address
                  </h4>
                  <p className="text-base text-gray-700 capitalize">
                    {selectedFoodItem.restaurantId.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllFoodItems;
