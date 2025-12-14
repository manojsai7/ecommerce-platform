const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    
    const token = generateToken(user);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is inactive' });
    }
    
    const token = generateToken(user);
    
    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    
    await req.user.update({
      firstName,
      lastName,
      phone,
      address,
    });
    
    res.json({
      message: 'Profile updated successfully',
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
