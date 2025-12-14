# API Documentation

Base URL: `http://localhost:5000/api`

All endpoints (except authentication) require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Authentication

### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Get Current User
```http
GET /api/auth/me
```

**Headers:** `Authorization: Bearer <token>`

### Update Profile
```http
PUT /api/auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

## Products

### Get All Products
```http
GET /api/products?page=1&limit=20&category=Electronics&search=laptop&minPrice=100&maxPrice=1000&sortBy=price&order=ASC
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by category
- `search` (optional): Search in name and description
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `sortBy` (optional): Sort field (default: createdAt)
- `order` (optional): Sort order ASC/DESC (default: DESC)

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 5
  }
}
```

### Get Product by ID
```http
GET /api/products/:id
```

### Create Product (Admin Only)
```http
POST /api/products
```

**Headers:** `Authorization: Bearer <admin-token>`

**Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "compareAtPrice": 129.99,
  "sku": "PROD-001",
  "inventory": 100,
  "category": "Electronics",
  "tags": ["tag1", "tag2"],
  "images": ["https://example.com/image.jpg"],
  "isFeatured": true
}
```

### Update Product (Admin Only)
```http
PUT /api/products/:id
```

### Delete Product (Admin Only)
```http
DELETE /api/products/:id
```

## Cart

### Get Cart
```http
GET /api/cart
```

**Headers:** `Authorization: Bearer <token>`

### Add Item to Cart
```http
POST /api/cart/items
```

**Body:**
```json
{
  "productId": "product-uuid",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /api/cart/items/:productId
```

**Body:**
```json
{
  "quantity": 3
}
```

### Remove Item from Cart
```http
DELETE /api/cart/items/:productId
```

### Clear Cart
```http
DELETE /api/cart
```

## Orders

### Create Order
```http
POST /api/orders
```

**Body:**
```json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "stripe",
  "paymentDetails": {
    "paymentMethodId": "pm_card_visa"
  }
}
```

### Get All Orders
```http
GET /api/orders?page=1&limit=10
```

### Get Order by ID
```http
GET /api/orders/:id
```

### Update Order Status (Admin Only)
```http
PUT /api/orders/:id
```

**Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456"
}
```

**Status options:**
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

## Reviews

### Get Product Reviews
```http
GET /api/reviews/products/:productId/reviews
```

### Create Review
```http
POST /api/reviews/products/:productId/reviews
```

**Body:**
```json
{
  "rating": 5,
  "title": "Great product!",
  "comment": "Really satisfied with this purchase."
}
```

### Update Review
```http
PUT /api/reviews/:id
```

**Body:**
```json
{
  "rating": 4,
  "title": "Updated review",
  "comment": "Still good but found some issues."
}
```

### Delete Review
```http
DELETE /api/reviews/:id
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## Authentication Flow

1. User registers or logs in to receive a JWT token
2. Store the token securely (e.g., httpOnly cookie or localStorage)
3. Include the token in the Authorization header for protected endpoints
4. Token expires after 7 days (configurable in .env)

## Payment Integration

### Stripe
The platform uses Stripe for payment processing. To test payments:

1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC

### PayPal
PayPal integration is set up but uses a mock response. Implement actual PayPal SDK integration for production use.
