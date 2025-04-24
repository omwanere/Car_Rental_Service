import express from "express";
import multer from "multer";
import { Listing } from "../models/Listing.Model.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create Listing Function
export const create = async (req, res) => {
  try {
    const {
      creator,
      type,
      streetAddress,
      city,
      province,
      country,
      model,
      make,
      year,
      color,
      registrationNumber,
      amenities,
      title,
      description,
      price,
    } = req.body;
    console.log("Full req.body:", req.body);

    //console.log("Received creator:", creator);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No Photo uploaded." });
    }

    // Extract file paths
    const listingPhotosPaths = req.files.map((file) => file.path);

    // Create new listing
    const newListing = new Listing({
      creator,
      type,
      location: { streetAddress, city, province, country },
      vehicleDetails: { model, make, year, color, registrationNumber },
      amenities,
      photos: listingPhotosPaths,
      description: { title, description, price },
    });
    console.log(creator);
    console.log("New Listing Created:", newListing);
    await newListing.save();

    res.status(201).json(newListing);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create listing", error: error.message });
  }
};

export const cars = async (req, res) => {
  try {
    const listings = await Listing.find().populate(
      "creator",
      "FirstName LastName"
    );
    res.status(200).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: error.message });
    console.log(error);
  }
};

export const getCarById = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate(
      "creator",
      "FirstName LastName"
    );
    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
};
