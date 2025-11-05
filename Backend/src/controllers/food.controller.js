import FoodItem from "../models/food.Model.js";
import mongoose from "mongoose";

// get all food items
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find()
      .populate("restaurantId")
      .populate("ownerId");

    res.status(200).json({
      msg: "All food items fetched",
      data: foodItems,
    });
  } catch (err) {
    console.error("Error fetching food items:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const foodItems = await FoodItem.find({ restaurantId });

    if (!foodItems.length) {
      return res
        .status(404)
        .json({ msg: "No food items found for this restaurant" });
    }

    res.status(200).json({
      msg: "Food items by restaurant fetched",
      data: foodItems,
    });
  } catch (err) {
    console.error("Error fetching food items by restaurant:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// get all food item by cusine category
export const getFoodItemsByCusineCategory = async (req, res) => {
  try {
    const { cusineCategory } = req.params;

    const items = await FoodItem.find({ cusineCategory });

    if (!items.length) {
      return res
        .status(404)
        .json({ msg: "No food items found in this category" });
    }

    res.status(200).json({
      msg: `Food items in ${cusineCategory}`,
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// getting all cusines
export const getAllCusineCategories = async (req, res) => {
  try {
    const cusines = await FoodItem.find()
      .populate("restaurantId")
      .populate("ownerId");
    res.status(200).json({
      msg: "All cusines fetched",
      data: cusines,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// get a particular food item
export const getFoodItemById = async (req, res) => {
  try {
    const { foodId } = req.params;

    const foodItem = await FoodItem.findById(foodId)
      .populate("restaurantId")
      .populate("ownerId");

    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    res.status(200).json({
      msg: "Food item fetched",
      data: foodItem,
    });
  } catch (err) {
    console.error("Error fetching food item:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    const updateData = req.body;

    const updated = await FoodItem.findByIdAndUpdate(foodId, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    res.status(200).json({
      msg: "Food item updated",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating food item:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;

    const deleted = await FoodItem.findByIdAndDelete(foodId);

    if (!deleted) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    res.status(200).json({ msg: "Food item deleted successfully" });
  } catch (err) {
    console.error("Error deleting food item:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// add a food item
export const postAddFoodItem = async (req, res) => {
  try {
    const { name, cusineCategory, description, price, restaurantId, ownerId } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    if (!name || !price || !restaurantId || !cusineCategory) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ msg: "Invalid restaurant ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ msg: "Invalid owner ID" });
    }

    const newFoodItem = await FoodItem.create({
      name,
      description,
      price,
      cusineCategory,
      image: imagePath,
      restaurantId: restaurantId,
      ownerId: ownerId,
    });

    res.status(201).json({
      msg: "Food item added successfully",
      data: newFoodItem,
    });
  } catch (err) {
    console.error("Error adding food item:", err);
    res.status(500).json({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
};
