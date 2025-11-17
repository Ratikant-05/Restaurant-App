import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const GetAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4444/api/restaurants"
        );
        setRestaurants(response.data.restaurants);
      } catch (error) {
        setError("Failed to get Restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading restaurants...</p>
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

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Recommended for you
        </h2>
        <p className="text-gray-600">Discover amazing restaurants near you</p>
      </div>

      {restaurants.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No restaurants available at the moment.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <NavLink
              className="no-underline group"
              to={`/selectedRestaurant/${restaurant._id}`}
              key={restaurant._id}
            >
              <li className="list-none bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col">
                <div className="relative overflow-hidden h-48 bg-gray-200">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={`http://localhost:4444${restaurant.image}`}
                    alt={restaurant.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 capitalize mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                    {restaurant.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      {restaurant.rating || "4.5"}
                    </span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-sm text-gray-500">
                      {restaurant.cuisine || "Fast Food"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 capitalize line-clamp-2 flex-1">
                    {restaurant.address}
                  </p>

                  {restaurant.deliveryTime && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs text-gray-500">
                        {restaurant.deliveryTime} min
                      </span>
                    </div>
                  )}
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllRestaurants;
