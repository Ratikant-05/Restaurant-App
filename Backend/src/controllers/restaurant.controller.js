import Restaurant from "../models/restaurant.model.js";

export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        msg: "No restaurants found",
        restaurants: []
      });
    }

    res.status(200).json({
      message: "Restaurants sent",
      restaurants: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message
    });
  }
};

export const getRestaurantById = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        msg: "Restaurant Not Found",
      });
    }

    res.status(200).json({
      message: "Restaurant sent",
      restaurant: restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message
    });
  }
};