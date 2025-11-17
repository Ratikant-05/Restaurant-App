import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Styles/Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    restaurants: [],
    foodItems: [],
    cuisines: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchData = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults({ restaurants: [], foodItems: [], cuisines: [] });
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const [restaurantsRes, foodItemsRes, cuisinesRes] = await Promise.all([
          axios.get("http://localhost:4444/api/restaurants").catch(() => null),
          axios
            .get("http://localhost:4444/food/get-all-food-items")
            .catch(() => null),
          axios
            .get("http://localhost:4444/food/getAllCusineCategories")
            .catch(() => null),
        ]);

        const query = searchQuery.toLowerCase();

        const filteredRestaurants =
          restaurantsRes?.data?.restaurants?.filter(
            (restaurant) =>
              restaurant.name?.toLowerCase().includes(query) ||
              restaurant.address?.toLowerCase().includes(query)
          ) || [];

        const filteredFoodItems =
          foodItemsRes?.data?.data?.filter(
            (item) =>
              item.name?.toLowerCase().includes(query) ||
              item.description?.toLowerCase().includes(query) ||
              item.cusineCategory?.toLowerCase().includes(query)
          ) || [];

        const filteredCuisines =
          cuisinesRes?.data?.data?.filter(
            (cuisine) =>
              cuisine.cusineCategory?.toLowerCase().includes(query) ||
              cuisine.name?.toLowerCase().includes(query)
          ) || [];

        setSearchResults({
          restaurants: filteredRestaurants.slice(0, 3),
          foodItems: filteredFoodItems.slice(0, 3),
          cuisines: filteredCuisines.slice(0, 3),
        });
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults({ restaurants: [], foodItems: [], cuisines: [] });
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleResultClick = (type, item) => {
    setSearchQuery("");
    setShowResults(false);
    setIsMobileMenuOpen(false);

    if (type === "restaurant") {
      navigate("/selectedRestaurant", { state: { restaurant: item } });
    } else if (type === "foodItem") {
      navigate("/", { state: { highlightFoodItem: item._id } });
    } else if (type === "cuisine") {
      navigate("/", { state: { filterCuisine: item.cusineCategory } });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/", { state: { searchQuery } });
      setSearchQuery("");
      setShowResults(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <NavLink className="logo" to="/">
        <span className="logo-text">Food Panda</span>
      </NavLink>

      <div className="search-container" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="What's on your mind?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              className="search-input"
              />
            {isSearching && (
              <div className="search-spinner">
                <div className="spinner"></div>
              </div>
            )}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setShowResults(false);
                }}
                className="search-clear"
                aria-label="Clear search"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="clear-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>

        {showResults &&
          (searchResults.restaurants.length > 0 ||
            searchResults.foodItems.length > 0 ||
            searchResults.cuisines.length > 0) && (
            <div className="search-results">
              {searchResults.restaurants.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title">Restaurants</div>
                  {searchResults.restaurants.map((restaurant) => (
                    <div
                      key={restaurant._id}
                      className="search-result-item"
                      onClick={() => handleResultClick("restaurant", restaurant)}
                    >
                      <svg
                        className="result-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <div className="result-content">
                        <div className="result-name">{restaurant.name}</div>
                        <div className="result-detail">{restaurant.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.foodItems.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title">Food Items</div>
                  {searchResults.foodItems.map((item) => (
                    <div
                      key={item._id}
                      className="search-result-item"
                      onClick={() => handleResultClick("foodItem", item)}
                    >
                      <svg
                        className="result-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <div className="result-content">
                        <div className="result-name">{item.name}</div>
                        <div className="result-detail">
                          ₹{item.price} • {item.cusineCategory}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.cuisines.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title">Cuisines</div>
                  {searchResults.cuisines.map((cuisine) => (
                    <div
                      key={cuisine._id}
                      className="search-result-item"
                      onClick={() => handleResultClick("cuisine", cuisine)}
                    >
                      <svg
                        className="result-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <div className="result-content">
                        <div className="result-name">
                          {cuisine.cusineCategory || cuisine.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        {showResults &&
          searchQuery.length >= 2 &&
          searchResults.restaurants.length === 0 &&
          searchResults.foodItems.length === 0 &&
          searchResults.cuisines.length === 0 &&
          !isSearching && (
            <div className="search-results">
              <div className="search-no-results">
                No results found for "{searchQuery}"
              </div>
            </div>
          )}
      </div>

      <div className={`nav-btn ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <NavLink
          to="/login"
          className="btn-login"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className="btn-signup"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/profile"
          className="btn-profile"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            className="profile-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </NavLink>
      </div>

      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </nav>
  );
}

export default Navbar;