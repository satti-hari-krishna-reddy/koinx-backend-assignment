
function buildCoinGeckoURL(baseUrl, params) {

  const searchParams = new URLSearchParams();

  if (params.ids && Array.isArray(params.ids)) {
    searchParams.append('ids', params.ids.join(','));
  }

  if (params.vs_currencies) {
    searchParams.append('vs_currencies', params.vs_currencies);
  }

  if (params.include_market_cap !== undefined) {
    searchParams.append('include_market_cap', params.include_market_cap.toString());
  }

  if (params.include_24hr_change !== undefined) {
    searchParams.append('include_24hr_change', params.include_24hr_change.toString());
  }

  return `${baseUrl}?${searchParams.toString()}`;
}

module.exports = { buildCoinGeckoURL };