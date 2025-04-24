import express from "express";
import {
  TripList,
  WishList,
  CarList,
  ReservationList,
  getWishList,
} from "../controllers/user.js";

const router = express.Router();

router.route("/:userId/trips").get(TripList);
router.route("/:userId/wishlist").get(getWishList);
router.patch("/:userId/wishlist/:listingId", WishList);
router.route("/:userId/cars").get(CarList);
router.route("/:userId/reservations").get(ReservationList);

export default router;
