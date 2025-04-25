import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import paymentRoute from "./routes/payment.route.js";
import authRoute from "./routes/auth.route.js";
import listingRoute from "./routes/listing.route.js";
import bookingRoute from "./routes/booking.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.static("public"));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cars", listingRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/payment", paymentRoute);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
