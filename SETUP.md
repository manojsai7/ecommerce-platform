# Setup Guide

This guide will help you set up the E-commerce Platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Redis** (v6 or higher) - [Download](https://redis.io/download)
- **Git** - [Download](https://git-scm.com/downloads)
- **Docker** (optional) - [Download](https://www.docker.com/products/docker-desktop)

## Quick Start with Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/manojsai7/ecommerce-platform
cd ecommerce-platform

# Start all services
docker-compose up -d

# Wait for services to be ready, then seed the database
docker-compose exec backend npm run seed
```

Your application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Manual Setup

If you prefer to run the services manually:

### 1. Clone the Repository

```bash
git clone https://github.com/manojsai7/ecommerce-platform
cd ecommerce-platform
```

### 2. Set Up PostgreSQL

```bash
# Create the database
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

### 3. Set Up Redis

```bash
# Start Redis server
redis-server
```

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and update the following:
# DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ecommerce
# REDIS_URL=redis://localhost:6379
# JWT_SECRET=your-secure-random-secret-key

# Run database migrations and seed data
npm run seed

# Start the development server
npm run dev
```

Backend will be running on http://localhost:5000

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env.local

# Edit .env.local and update:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

Frontend will be running on http://localhost:3000

## Testing the Setup

1. **Health Check**: Visit http://localhost:5000/health - Should return `{"status":"ok"}`

2. **Frontend**: Visit http://localhost:3000 - Should see the homepage

3. **Login**: Use the seeded credentials:
   - Admin: `admin@ecommerce.com` / `admin123`
   - Customer: `customer@example.com` / `customer123`

## Configuration

### Backend Environment Variables

Create `backend/.env` with the following:

```env
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRES_IN=7d

# Stripe (Get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# PayPal (Optional)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox

# Email (Optional - for order confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@ecommerce.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Common Issues

### PostgreSQL Connection Error

**Issue**: `ECONNREFUSED` or `Connection refused`

**Solution**: 
- Ensure PostgreSQL is running: `pg_ctl status`
- Check connection string in `.env`
- Verify database exists: `psql -l`

### Redis Connection Error

**Issue**: `ECONNREFUSED` when connecting to Redis

**Solution**:
- Ensure Redis is running: `redis-cli ping` (should return PONG)
- Start Redis: `redis-server`

### Port Already in Use

**Issue**: `EADDRINUSE: address already in use :::5000`

**Solution**:
- Find and kill the process: `lsof -ti:5000 | xargs kill`
- Or change the port in `.env`

### Module Not Found

**Issue**: `Cannot find module`

**Solution**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Make Changes**: Edit files and see hot-reload in action
4. **Run Tests**: `npm test` in respective directories
5. **Lint Code**: `npm run lint`
6. **Format Code**: `npm run format`

## Next Steps

- Read the [API Documentation](README.md#api-documentation)
- Check out [Contributing Guidelines](CONTRIBUTING.md)
- Explore the codebase
- Start building features!

## Getting Help

- Open an [Issue](https://github.com/manojsai7/ecommerce-platform/issues)
- Check existing [Discussions](https://github.com/manojsai7/ecommerce-platform/discussions)
- Read the [Documentation](README.md)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Stripe API Documentation](https://stripe.com/docs/api)
