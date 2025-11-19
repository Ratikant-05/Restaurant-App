import axios from "axios";
import React, { useEffect, useState } from "react";

const GetAllCusines = () => {
  const [cusines, setCusines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    const fetchCusines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4444/food/getAllCusineCategories"
        );
        console.log(response.data.data)
        setCusines(response.data.data);
      } catch (error) {
        setError("Failed to get cusines");
      } finally {
        setLoading(false);
      }
    };
    fetchCusines();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading cuisines...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
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
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Inspiration for your first order
        </h2>
        <p className="text-gray-600">Explore delicious cuisines from around the world</p>
      </div>

      {cusines.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No cuisines available at the moment.
          </p>
        </div>
      ) : (
        <div
          style={{ scrollbarWidth: "none" }}
          className="overflow-x-auto pb-4 -mx-4 px-4"
        >
          <style>
            {`
              .cuisine-scroll::-webkit-scrollbar {
                display: none;
              }
              .cuisine-scroll {
                -ms-overflow-style: none;
              }
            `}
          </style>
          <ul
            style={{ paddingInlineStart: 0 }}
            className="flex gap-6 snap-x snap-mandatory cuisine-scroll"
          >
            {cusines.map((cusine) => (
              <li
                key={cusine._id}
                className="flex flex-col items-center snap-start min-w-[180px] sm:min-w-[200px] group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-3 ring-2 ring-transparent group-hover:ring-blue-500 group-hover:ring-offset-2">
                  <div className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-full">
                    {!failedImages.has(cusine._id) && cusine.image ? (
                      <img
                        className="w-full h-full transition-transform duration-500 group-hover:scale-110 object-cover rounded-full"
                        src={`http://localhost:4444${cusine.image}`}
                        alt={cusine.cusineCategory || cusine.name}
                        onError={() => {
                          setFailedImages((prev) => new Set(prev).add(cusine._id));
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-4xl font-bold rounded-full">
                        {(cusine.cusineCategory || cusine.name || "?")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none"></div>
                </div>
                <h3 className="text-center text-gray-900 font-semibold text-base sm:text-lg capitalize group-hover:text-blue-600 transition-colors duration-200 px-2">
                  {cusine.cusineCategory || cusine.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetAllCusines;
