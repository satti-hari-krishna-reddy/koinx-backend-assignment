const app = require('./app');
const connectDB = require('./config/db');
const {connectRedis} = require('./config/redis');
const initRedisSubscriber = require('./events/redisSubscriber');

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  await connectRedis();
  await initRedisSubscriber();


  app.listen(PORT, () => {
    console.log('[INFO] API server listening on port', PORT);
  });
}

start().catch(err => {
  console.log('[ERROR] Failed to start application:', err);
  process.exit(1);
});