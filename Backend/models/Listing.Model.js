import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      country: { type: String, required: true },
    },
    vehicleDetails: {
      model: { type: String, required: true },
      make: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      registrationNumber: { type: String, required: true },
    },
    amenities: {
      type: [String],
      default: [],
    },
    photos: [
      {
        type: String,
      },
    ],
    description: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Listing = mongoose.model("Listing", listingSchema);
