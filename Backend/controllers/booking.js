import router from "express";
import { Booking } from "../models/Booking.Model.js";

export const booking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: error.message });
  }
};
