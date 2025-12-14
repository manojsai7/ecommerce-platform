const nodemailer = require('nodemailer');
const config = require('../config');

let transporter = null;

if (config.email.host && config.email.user && config.email.pass) {
  transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
}

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    if (!transporter) {
      console.log('Email not configured, skipping email send');
      return { success: false, error: 'Email not configured' };
    }
    
    const info = await transporter.sendMail({
      from: config.email.from,
      to,
      subject,
      text,
      html,
    });
    
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

const sendOrderConfirmationEmail = async (email, order) => {
  const subject = `Order Confirmation - ${order.orderNumber}`;
  const html = `
    <h1>Thank you for your order!</h1>
    <p>Your order <strong>${order.orderNumber}</strong> has been received.</p>
    <h2>Order Details</h2>
    <p><strong>Total:</strong> $${order.total}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <h3>Items:</h3>
    <ul>
      ${order.items.map(item => `
        <li>${item.name} - Quantity: ${item.quantity} - $${item.price}</li>
      `).join('')}
    </ul>
    <p>We'll send you an update when your order ships.</p>
  `;
  
  return sendEmail({ to: email, subject, html });
};

const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Our E-commerce Platform!';
  const html = `
    <h1>Welcome, ${name}!</h1>
    <p>Thank you for creating an account with us.</p>
    <p>Start shopping now and enjoy exclusive deals!</p>
  `;
  
  return sendEmail({ to: email, subject, html });
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const subject = 'Password Reset Request';
  const html = `
    <h1>Password Reset</h1>
    <p>You requested to reset your password.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${config.frontend.url}/reset-password?token=${resetToken}">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
  `;
  
  return sendEmail({ to: email, subject, html });
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
