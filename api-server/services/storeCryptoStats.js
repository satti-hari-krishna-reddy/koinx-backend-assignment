const { fetchCryptoStats } = require('./fetchCryptoStats');
const CryptoStat = require('../models/CryptoStat');

async function storeCryptoStats() {
  const cryptoStats = await fetchCryptoStats();

  if (!cryptoStats || cryptoStats.length === 0) {
    console.error('[ERROR] Unable to store results as fetchCryptoStats failed or returned no data');
    return;
  }

  try {
    await CryptoStat.insertMany(cryptoStats);
    console.log('[INFO] Successfully stored crypto stats to DB');
  } catch (err) {
    console.error('[ERROR] Failed to store crypto stats to DB:', err.message);
  }
}

module.exports = { storeCryptoStats };
