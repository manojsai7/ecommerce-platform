const { Order, Cart, Product } = require('../models');
const { processPayment } = require('../services/paymentService');
const { sendOrderConfirmationEmail } = require('../services/emailService');

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, billingAddress, paymentMethod, paymentDetails } = req.body;
    
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Calculate totals
    let subtotal = 0;
    for (const item of cart.items) {
      subtotal += parseFloat(item.price) * item.quantity;
    }
    
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    // Process payment
    const paymentResult = await processPayment({
      amount: total,
      method: paymentMethod,
      details: paymentDetails,
    });
    
    if (!paymentResult.success) {
      return res.status(400).json({ error: 'Payment failed', details: paymentResult.error });
    }
    
    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      userId: req.user.id,
      items: cart.items,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      paymentId: paymentResult.paymentId,
      paymentStatus: 'paid',
      status: 'processing',
    });
    
    // Update inventory
    for (const item of cart.items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({ inventory: product.inventory - item.quantity });
      }
    }
    
    // Clear cart
    await cart.update({ items: [] });
    
    // Send confirmation email
    await sendOrderConfirmationEmail(req.user.email, order);
    
    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    
    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });
    
    res.json({
      orders,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Users can only view their own orders unless they're admin
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json({ order });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber } = req.body;
    
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    await order.update({ status, trackingNumber });
    
    res.json({
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
