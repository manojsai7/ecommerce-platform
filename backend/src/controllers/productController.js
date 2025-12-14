const { Product, Review } = require('../models');
const { Op } = require('sequelize');

const getAllProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'DESC',
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    const where = { isActive: true };
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }
    
    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]],
    });
    
    res.json({
      products,
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

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Get reviews separately with pagination to avoid performance issues
    const reviews = await Review.findAll({
      where: { productId: req.params.id },
      include: [{ model: User, attributes: ['firstName', 'lastName'] }],
      limit: 10,
      order: [['createdAt', 'DESC']],
    });
    
    res.json({ 
      product,
      reviews 
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await product.update(req.body);
    
    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await product.update({ isActive: false });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
