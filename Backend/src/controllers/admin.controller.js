import Restaurant from "../models/restaurant.model.js";
import mongoose from "mongoose";

export const postRestaurant = async (req, res, next) => {
  try {
    const { name, address, email, contact } = req.body;
    const { userId } = req.body;

    if (!name || !email || !address || !contact) {
      return res.status(400).json({
        msg: "Insufficient Details",
      });
    }

    // Validate userId if provided, otherwise use a default ObjectId
    let ownerId;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      ownerId = userId;
    } else {
      // Create a temporary ObjectId for testing purposes
      ownerId = new mongoose.Types.ObjectId();
    }

    const existingRestaurant = await Restaurant.findOne({
      $or: [{ email }],
    });

    if (existingRestaurant) {
      return res.status(400).json({
        msg: "Restaurant with one of the details already exists",
      });
    }

    let newRestaurant = await Restaurant.create({
      ownerId: ownerId,
      name,
      address,
      email,
      contact,
    });

    res.status(200).json({
      message: "Restaurant successfully added",
      data: newRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
