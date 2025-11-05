import Cart from "../models/cart.Model.js";
import mongoose from 'mongoose';

export const postAddToCart = async (req,res,next) => {

  try {
    const { userId, restaurantId, foodItemId, quantity } = req.body;

    if (!userId || !restaurantId || !foodItemId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Validate ObjectIds (except for temp userId)
    if (!mongoose.Types.ObjectId.isValid(restaurantId) || 
        !mongoose.Types.ObjectId.isValid(foodItemId)) {
      return res.status(400).json({ msg: "Invalid restaurant or food item ID format" });
    }

    // Handle temporary userId or validate if it's a proper ObjectId
    let validUserId = userId;
    if (userId !== '507f1f77bcf86cd799439011' && !mongoose.Types.ObjectId.isValid(userId)) {
      // Create a temporary ObjectId for invalid userIds
      validUserId = new mongoose.Types.ObjectId();
    }
  
    let userCart = await Cart.findOne({userId: validUserId});

    // If no cart, create new
    if (!userCart) {
      userCart = await Cart.create({
        userId: validUserId,
        restaurantId,
        items: [
          {
          foodItemId,
          quantity:quantity || 1
        }
      ]
      });
    } else {
      // Check if adding from different restaurant
      if (userCart.restaurantId.toString() !== restaurantId.toString()) {
        // Clear cart and add new item from different restaurant
        userCart.restaurantId = restaurantId;
        userCart.items = [{
          foodItemId,
          quantity: quantity || 1
        }];
      } else {
        const itemIndex = userCart.items.findIndex(
          (item) => item.foodItemId.toString() === foodItemId.toString()
        );

        if (itemIndex > -1) {
          userCart.items[itemIndex].quantity += quantity || 1;
        } 
        else {
          userCart.items.push({
            foodItemId,
            quantity: quantity || 1
          });
        }
      }

      await userCart.save();
    }

    res.status(200).json({ msg: "Item added to cart", userCart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ 
      msg: "Internal server error",
      error: error.message 
    });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Handle temporary userId validation
    let validUserId = userId;
    if (userId !== '507f1f77bcf86cd799439011' && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const cart = await Cart.findOne({ userId: validUserId })
      .populate("items.foodItemId")
      .populate("restaurantId");

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ 
      msg: "Internal server error",
      error: error.message 
    });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId } = req.body;
  const { foodItemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    console.log(cart)
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const index = cart.items.findIndex(
      (item) => item.foodItemId.toString() === foodItemId
    );

    if (index === -1) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    cart.items.splice(index, 1);
    await cart.save();

    res.status(200).json({ msg: "Item removed from cart", cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateCartItem = async (req, res) => {
  const { userId, quantity } = req.body;
  const { foodItemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const index = cart.items.findIndex(
      (item) => item.foodItemId.toString() === foodItemId
    );

    if (index === -1) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    if (quantity < 1) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ msg: "Cart updated", cart });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ msg: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};