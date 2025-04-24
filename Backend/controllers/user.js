import { Booking } from "../models/Booking.Model.js";
import { User } from "../models/User.Model.js";
import { Listing } from "../models/Listing.Model.js";

export const TripList = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(trips);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Cannot find trips!", error: error.message });
  }
};

export const WishList = async (req, res) => {
  try {
    const { userId, listingId } = req.params;

    // Validate user and listing
    console.log("Incoming Params ->", { userId, listingId });
    const user = await User.findOne({ _id: userId });

    console.log("Fetched User from DB ->", user);

    //const user = await User.findById(userId).populate("wishList");
    if (!user) return res.status(404).json({ message: "User not found" });

    const listing = await Listing.findById(listingId).populate("creator");
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Check if the listing is already in the wishlist
    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing removed from wishlist",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listingId);
      await user.save();
      const updatedUser = await User.findById(userId).populate("wishList");
      res.status(200).json({
        message: "Listing added to wishlist",
        wishList: updatedUser.wishList,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const CarList = async (req, res) => {
  try {
    const { userId } = req.params;
    const cars = await Listing.find({ creator: userId }).populate("creator");
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Cannot find cars!", error: error.message });
  }
};

export const ReservationList = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Cannot find reservations!", error: error.message });
  }
};

export const getWishList = async (req, res) => {
  try {
    const { userId } = req.params;
    //console.log("Fetching wishlist for userId:", userId);
    const user = await User.findById(userId).populate("wishList");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.wishList); // Send populated wishlist
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
