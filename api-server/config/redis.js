const { createClient } = require('redis');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' });
}

const {
  REDIS_ADDR = 'localhost:6379',
  REDIS_PASSWORD = '',
  REDIS_DB = '0',
  REDIS_USE_TLS = 'false'
} = process.env;

let RedisClient;

async function connectRedis() {
const scheme = REDIS_USE_TLS.toLowerCase() === 'true' ? 'rediss' : 'redis';
const redisUrl = `${scheme}://${REDIS_PASSWORD ? `:${encodeURIComponent(REDIS_PASSWORD)}@` : ''}${REDIS_ADDR}/${REDIS_DB}`;


  RedisClient = createClient({ url: redisUrl });

  RedisClient.on('error', err => {
    console.log('[ERROR] Redis client error:', err.message);
  });

  await RedisClient.connect();
  console.log('[INFO] Connected to Redis');
}

async function getRedisSubscriber() {
  const subscriber = RedisClient.duplicate();
  await subscriber.connect();
  return subscriber;
}

module.exports = {
  connectRedis,
  getRedisSubscriber
};
