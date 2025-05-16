require('dotenv').config({ path: '../../.env' }); 
const { getRedisSubscriber } = require('../config/redis');
const { storeCryptoStats } = require('../services/storeCryptoStats');

const REDIS_CHANNEL = process.env.REDIS_CHANNEL_NAME || 'crypto_update'; 
async function initRedisSubscriber() {
  const subscriber = await getRedisSubscriber(); 
  await subscriber.subscribe(REDIS_CHANNEL, async (message) => {
    console.log('[INFO] Received update event from Redis:', message);

    try {
      await storeCryptoStats();
      console.log('[INFO] storeCryptoStats() completed successfully');
    } catch (err) {
      console.log('[ERROR] storeCryptoStats() failed:', err.message);
    }
  });

  console.log('[INFO] Subscribed to channel:', REDIS_CHANNEL);
}

module.exports = initRedisSubscriber;
