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
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config({});

const app = express();

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(xss()); // Prevent XSS attacks
app.use(mongoSanitize()); // Prevent NoSQL injection

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.PRODUCTION_URL] 
  : ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600 // Cache preflight requests for 10 minutes
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
