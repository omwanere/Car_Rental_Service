# Car Rental Management System

A full-stack web application for managing car rentals, built with modern web technologies.

## 🚀 Features

- User authentication and authorization
- Car inventory management
- Booking and reservation system
- Admin dashboard
- Responsive design
- Real-time updates
- 💳 **Secure Payment Processing** with Razorpay integration
  - Multiple payment methods support (Cards, UPI, Netbanking, Wallets)
  - Secure transaction handling
  - Payment history tracking
  - Refund management

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios for API calls
- Razorpay Checkout for payment processing

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API
- Razorpay API integration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
Car_Rental/
├── Backend/
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── index.js        # Entry point
│
└── Frontend/
    ├── src/            # React source code
    ├── public/         # Static assets
    └── package.json    # Frontend dependencies
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users can:
- Register new accounts
- Login with existing credentials
- Access protected routes based on their role

## 📝 API Documentation

The backend provides a RESTful API with the following endpoints:

- `/api/auth/*` - Authentication routes
- `/api/cars/*` - Car management routes
- `/api/bookings/*` - Booking management routes
- `/api/users/*` - User management routes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Om Wanere - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project 

## 💳 Payment Processing

The application integrates with Razorpay for secure payment processing. Features include:

- Secure payment processing for cards, UPI, netbanking, and wallets
- Automatic payment verification
- Refund processing
- Payment history tracking

To enable payment processing, add the following to your backend `.env` file:
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
``` 