# E-commerce Platform

A full-stack commerce starter with catalog, cart, checkout, payments, and an admin back office.

## Features

- **Product Catalog**: Browse and search products by category
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout**: Complete purchase with shipping information
- **Payment Integration**: Stripe payment processing
- **User Authentication**: Register and login functionality with JWT
- **Order Management**: View order history and details
- **Admin Dashboard**: Manage products and orders (admin users only)

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing
- bcrypt for password hashing

### Frontend
- React with React Router
- Axios for API calls
- Stripe React components
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manojsai7/ecommerce-platform.git
cd ecommerce-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Configuration

1. Backend configuration:
   - Copy `backend/.env.example` to `backend/.env`
   - Update the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `STRIPE_SECRET_KEY`: Your Stripe secret key
     - `PORT`: Backend server port (default: 5000)

2. Frontend configuration:
   - Copy `frontend/.env.example` to `frontend/.env`
   - Update the following variables:
     - `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)
     - `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### Running the Application

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server (in a new terminal):
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)
- `POST /api/orders/payment-intent` - Create Stripe payment intent (protected)

## Default Admin User

To create an admin user, register a new user and manually update the `role` field in the MongoDB database from `customer` to `admin`.

## Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── productRoutes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CheckoutForm.js
│   │   │   ├── Navbar.js
│   │   │   ├── OrderManagement.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProductManagement.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── Admin.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   ├── OrderDetail.js
│   │   │   ├── Orders.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Products.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## License

ISC

