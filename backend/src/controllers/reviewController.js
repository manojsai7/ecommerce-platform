const { Review, Product, User } = require('../models');

const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.findAll({
      where: { productId },
      include: [{ model: User, attributes: ['firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
    });
    
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;
    
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      where: { userId: req.user.id, productId },
    });
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }
    
    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      title,
      comment,
    });
    
    // Update product rating
    const reviews = await Review.findAll({ where: { productId } });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await product.update({
      rating: avgRating.toFixed(1),
      reviewCount: reviews.length,
    });
    
    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body;
    
    const review = await Review.findByPk(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    if (review.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await review.update({ rating, title, comment });
    
    // Update product rating
    const reviews = await Review.findAll({ where: { productId: review.productId } });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.update(
      { rating: avgRating.toFixed(1) },
      { where: { id: review.productId } }
    );
    
    res.json({
      message: 'Review updated successfully',
      review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    if (review.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const productId = review.productId;
    await review.destroy();
    
    // Update product rating
    const reviews = await Review.findAll({ where: { productId } });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    await Product.update(
      { rating: avgRating.toFixed(1), reviewCount: reviews.length },
      { where: { id: productId } }
    );
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
};
