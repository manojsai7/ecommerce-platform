# E-commerce Platform

Full-stack e-commerce application with catalog, cart, checkout, and admin management.

## Features

- **Product Catalog**: Browse products with search, filters, and reviews
- **Shopping Cart**: Add/remove items, wishlist functionality
- **Checkout**: Integrated payment gateway (Stripe/PayPal)
- **Order Management**: Track orders and fulfillment status
- **Admin Dashboard**: Manage products, inventory, and promotions
- **Authentication**: JWT/OAuth with role-based access control
- **Notifications**: Email notifications and webhooks
- **Auditing**: Comprehensive logging and tracking

## Tech Stack

### Frontend
- React/Next.js
- TypeScript
- Tailwind CSS

### Backend
- Node.js with Express
- JWT Authentication
- RESTful API

### Database
- PostgreSQL (primary database)
- Redis (caching layer)
- Optional: ElasticSearch (advanced search)

### Payments
- Stripe adapter
- PayPal adapter

### Deployment
- Docker & Docker Compose

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Redis 6+
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manojsai7/ecommerce-platform
   cd ecommerce-platform
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

4. **Environment Configuration**
   
   Create `.env` files in both frontend and backend directories:
   
   **Backend `.env`:**
   ```
   PORT=5000
   NODE_ENV=development
   
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
   REDIS_URL=redis://localhost:6379
   
   # JWT
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   # PayPal
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   PAYPAL_MODE=sandbox
   
   # Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-password
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```
   
   **Frontend `.env`:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### Using Docker

```bash
docker-compose up -d
```

This will start all services (frontend, backend, PostgreSQL, Redis).

## Project Structure

```
ecommerce-platform/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Next.js pages
│   │   ├── styles/         # CSS and Tailwind styles
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                # Express backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   ├── tests/              # Test files
│   └── package.json
│
├── docker-compose.yml      # Docker services configuration
└── README.md
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove item from cart

### Orders
- `GET /api/orders` - List user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order (Admin)

### Reviews
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Add review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Development

### Running Tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

### Code Style

This project uses ESLint and Prettier for code formatting.

```bash
npm run lint
npm run format
```

## Roadmap

- [ ] Add headless commerce API
- [ ] Implement recommendation engine
- [ ] Create analytics dashboard
- [ ] Multi-tenant / multi-store support
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Advanced search with ElasticSearch
- [ ] Internationalization (i18n)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@example.com or join our Slack channel.
