const redis = require('redis');
const config = require('./index');

const redisClient = redis.createClient({
  url: config.redis.url,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
};

module.exports = { redisClient, connectRedis };
