const { Cart, Product } = require('../models');

const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    
    res.json({ cart });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.inventory < quantity) {
      return res.status(400).json({ error: 'Insufficient inventory' });
    }
    
    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    
    const items = [...cart.items];
    const existingItemIndex = items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      items[existingItemIndex].quantity += quantity;
    } else {
      items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0] || null,
      });
    }
    
    await cart.update({ items });
    
    res.json({
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const items = [...cart.items];
    const itemIndex = items.findIndex(item => item.productId === productId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      items.splice(itemIndex, 1);
    } else {
      items[itemIndex].quantity = quantity;
    }
    
    await cart.update({ items });
    
    res.json({
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const items = cart.items.filter(item => item.productId !== productId);
    await cart.update({ items });
    
    res.json({
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (cart) {
      await cart.update({ items: [] });
    }
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
