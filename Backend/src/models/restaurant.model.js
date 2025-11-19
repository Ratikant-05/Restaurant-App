import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    address: {
      type: String,
      lowercase: true,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    cusines:
        {
          type: String,
          trim: true,
          lowercase: true,
        },
    rating: {
      type: Number,
    },
    coverImage: {
      type: String,
    },
    reviews: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        message: {
          type: String,
          trim: true,
        },
        username: {
          type: String,
        },
      },
    ],
    restaurantStatus: {
      type: String,
      enum: ["Open", "Close"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Restaurant", restaurantSchema);
