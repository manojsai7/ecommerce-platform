const Stripe = require('stripe');
const config = require('../config');

const stripe = config.stripe.secretKey ? new Stripe(config.stripe.secretKey) : null;

const processPayment = async ({ amount, method, details }) => {
  try {
    if (method === 'stripe') {
      if (!stripe) {
        throw new Error('Stripe is not configured');
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        payment_method: details.paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });
      
      return {
        success: true,
        paymentId: paymentIntent.id,
      };
    } else if (method === 'paypal') {
      // PayPal integration would go here
      // For now, returning mock response
      return {
        success: true,
        paymentId: `PAYPAL-${Date.now()}`,
      };
    } else if (method === 'cod') {
      // Cash on delivery
      return {
        success: true,
        paymentId: `COD-${Date.now()}`,
      };
    }
    
    return {
      success: false,
      error: 'Unsupported payment method',
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

const createPaymentIntent = async (amount) => {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw error;
  }
};

const refundPayment = async (paymentId, amount) => {
  try {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }
    
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
    
    return {
      success: true,
      refundId: refund.id,
    };
  } catch (error) {
    console.error('Refund error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  processPayment,
  createPaymentIntent,
  refundPayment,
};
