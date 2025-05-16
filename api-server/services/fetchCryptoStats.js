const axios = require('axios');
const { buildCoinGeckoURL } = require('../utils/urlBuilder');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' });
}

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3/simple/price ';
const COINGECKO_PARAMS = {
  vs_currencies: 'usd',
  ids: ['bitcoin', 'ethereum', 'matic-network'],
  include_market_cap: true,
  include_24hr_change: true
};

async function fetchCryptoStats() {
  const url = buildCoinGeckoURL(COINGECKO_BASE_URL, COINGECKO_PARAMS);

  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': COINGECKO_API_KEY
      }
    });

    return Object.entries(response.data).map(([coin, stats]) => ({
      coin,
      price: stats?.usd ?? null,
      marketCap: stats?.usd_market_cap ?? null,
      change24h: stats?.usd_24h_change ?? null,
      timestamp: new Date()
    }));


  } catch (err) {
    const status = err.response?.status || 'Unknown';
    console.error(`[ERROR] CoinGecko API call failed. Status: ${status}`);
    return [];
  }
}

module.exports = { fetchCryptoStats };
