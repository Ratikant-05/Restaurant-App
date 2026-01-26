import Restaurant from "../models/restaurant.model.js";
import mongoose from "mongoose";

export const postRestaurant = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      contact,
      cusines,
      restaurantStatus,
      userId,
    } = req.body;

    const uploadedImages = Array.isArray(req.files?.images)
      ? req.files.images.map((file) => `/uploads/${file.filename}`)
      : [];
    const coverImagePath = req.files?.coverImage?.[0]
      ? `/uploads/${req.files.coverImage[0].filename}`
      : "";

    if (!name || !email || !address || !contact || cusines) {
      return res.status(400).json({ msg: "Insufficient Details" });
    }

    let ownerId;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      ownerId = userId;
    } else {
      ownerId = new mongoose.Types.ObjectId();
    }

    const existingRestaurant = await Restaurant.findOne({ email });

    if (existingRestaurant) {
      return res.status(400).json({
        msg: "Restaurant with this email already exists",
      });
    }

    const newRestaurant = await Restaurant.create({
      ownerId,
      name,
      address,
      email,
      contact,
      cusines,
      restaurantStatus,
      coverImage: coverImagePath,
      images: uploadedImages,
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