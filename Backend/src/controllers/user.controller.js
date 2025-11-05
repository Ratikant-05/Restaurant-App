import Restaurant from "../models/restaurant.model.js";

export const postAddReview = async (req, res, next) => {
  const { restaurant_id, rating, message } = req.body;
  const { userId, username } = req.body;
  try {
    if (!restaurant_id || !userId || !rating || !username) {
      res.status(400).json({
        msg: "Insufficient details",
      });
    }

    const restaurant = await Restaurant.findOne({ _id: restaurant_id });

    if (!restaurant) {
      res.status(400).json({
        msg: "Restaurant not found",
      });
    }

    const review = {
      UserId: userId,
      rating,
      message,
      username,
    };

    restaurant.reviews.push(review);
    await restaurant.save();

    res.status(200).json({
      message: "review successfully added",
      review,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

export const postUpdateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { restaurant_id, rating, message, userId } = req.body;

    if (!reviewId || !restaurant_id || !userId || !rating) {
      res.status(400).json({
        msg: "Insufficient details",
      });
    }

    const restaurant = await Restaurant.findById(restaurant_id);

    const index = restaurant.reviews.findIndex(
      (review) => review._id.toString() == reviewId.toString()
    );

    if (index == -1) {
      res.status(400).json({
        msg: "Review Not Found",
      });
    }

    if (rating) {
      restaurant.reviews[index].rating = rating;
    }

    if (message) {
      restaurant.reviews[index].message = message;
    }

    await restaurant.save();

    res.status(200).json({
      message: "Restaurant review updated",
      data: restaurant.reviews[index],
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
    console.log(error, "Error in postUpdateReview");
  }
};

export const getDeleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { restaurant_id } = req.body;

    const restaurant = await Restaurant.findById(restaurant_id);

    const index = restaurant.reviews.findIndex(
      (review) => review._id.toString() == reviewId.toString()
    );

    if (index == -1) {
      res.status(400).json({
        msg: "Review Not Found",
      });
    }

    restaurant.reviews.splice(index, 1);
    await restaurant.save();

    res.status(200).json({
      message: "Restaurant review deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { restaurant_id } = req.body;

    const restaurant = await Restaurant.findById(restaurant_id);

    if (!restaurant) {
      res.status(400).json({
        msg: "Restaurant Not Found",
      });
    }

    res.status(200).json({
      msg: "Reviews successfully sent",
      reviews: restaurant.reviews,
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { restaurant_id } = req.body;

    const restaurant = await Restaurant.findById(restaurant_id);

    if (!restaurant) {
      return res.status(400).json({
        msg: "Restaurant not Found",
      });
    }

    const index = restaurant.reviews.findIndex(
      (review) => review._id.toString() == reviewId.toString()
    );

    if (index == -1) {
      res.status(400).json({
        msg: "Review Not Found",
      });
    }

    res.status(200).json({
      message: "Restaurant review sent",
      review: restaurant.reviews[index],
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};