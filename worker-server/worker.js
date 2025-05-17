const { createClient } = require('redis');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' });
}

const {
  REDIS_ADDR = 'localhost:6379',
  REDIS_PASSWORD = '',
  REDIS_DB = '0',
  REDIS_USE_TLS = 'false',
  REDIS_CHANNEL_NAME = 'crypto_update'
} = process.env;

const scheme = REDIS_USE_TLS.toLowerCase() === 'true' ? 'rediss' : 'redis';
const redisUrl = `${scheme}://${REDIS_PASSWORD ? `:${encodeURIComponent(REDIS_PASSWORD)}@` : ''}${REDIS_ADDR}/${REDIS_DB}`;

const client = createClient({ url: redisUrl });

client.on('error', err => {
  console.error('[ERROR] Redis client error:', err.message);
});

async function startPublisher() {
  await client.connect();
  console.log('[INFO] Worker connected to Redis, will publish every 15 minutes');

  await publishUpdate();

  setInterval(publishUpdate, 15 * 60 * 1000);
}

async function publishUpdate() {
  try {
    const message = JSON.stringify({ trigger: 'update' });
    await client.publish(REDIS_CHANNEL_NAME, message);
    console.log(`[INFO] Published update message on "${REDIS_CHANNEL_NAME}"`);
  } catch (err) {
    console.error('[ERROR] Failed to publish update:', err.message);
  }
}

startPublisher().catch(err => {
  console.error('[ERROR] Worker failed to start:', err.message);
  process.exit(1);
});


//MONGO_URI = "mongodb://root:MongoDbStrongPassword123@mongodb:27017/koinx?authSource=admin";