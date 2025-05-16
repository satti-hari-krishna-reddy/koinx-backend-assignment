const CryptoStat = require('../models/CryptoStat');

exports.getLatestStats = async (req, res) => {
  let { coin } = req.query;
  coin = (coin || '').toLowerCase().trim();

  if (!['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin' });
  }

  try {
    const latestRecord = await CryptoStat.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestRecord) {
      return res.status(404).json({ error: 'No data found for this coin' });
    }

    res.json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.change24h
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPriceDeviation = async (req, res) => {
  let { coin } = req.query;
  coin = (coin || '').toLowerCase().trim();

  if (!['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin' });
  }

  try {
    const records = await CryptoStat.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: 'No records found' });
    }

    var prices = [];
    for (var j = 0; j < records.length; j++) {
      prices.push(records[j].price);
    }

    var n = prices.length;
    var sum = 0;
    for (var k = 0; k < n; k++) {
      sum += prices[k];
    }
    var mean = sum / n;

    var varianceSum = 0;
    for (var m = 0; m < n; m++) {
      var diff = prices[m] - mean;
      varianceSum += diff * diff;
    }
    var variance = varianceSum / n;
    var deviation = Math.sqrt(variance);
    deviation = Math.round(deviation * 100) / 100;
    
    res.json({ deviation: deviation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};