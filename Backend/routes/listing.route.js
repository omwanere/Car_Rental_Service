import express from "express";
import { create, cars, getCarById } from "../controllers/listing.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.route("/create").post(upload.array("listingPhotos", 5), create);
router.route("/").get(cars);
router.route("/:listingId").get(getCarById);

export default router;
