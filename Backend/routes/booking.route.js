import express from "express";
import { booking } from "../controllers/booking.js";
const router = express.Router();

router.route("/booking").post(booking);

export default router;
