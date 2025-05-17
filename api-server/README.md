# KoinX API Server

This is the **API Server** component of the KoinX Backend Assignment project. It exposes public APIs for cryptocurrency stats and manages all communication with MongoDB and the event system.

---

## 🔧 Structure Overview

Here's a quick overview of how the core logic is organized:

* **app.js / server.js** – Entry point that sets up and starts the server.
* **config/** – Contains configuration logic for MongoDB and Redis connections.
* **controllers/** – Defines route controllers that handle incoming API requests.
* **events/** – Handles event subscriptions, listens for messages from the event queue, and triggers updates.
* **models/** – Contains MongoDB schemas and models.
* **routes/** – API route definitions for `/stats` and `/deviation` endpoints.
* **services/** –  the `storeCryptoStats()` function that fetches, parses, and stores cryptocurrency stats from the CoinGecko API.
* **utils/** – Utility functions and shared helpers.

---

## 🚀 API Endpoints

### `GET /api/stats?coin=bitcoin`

Returns the latest stored data for the given coin.

**Sample Response:**

```json
{
  "price": 104245,
  "marketCap": 2071260438359.015,
  "24hChange": 0.28608077947668514
}
```

### `GET /api/deviation?coin=bitcoin`

Returns the standard deviation of the price over the last 100 records.

**Sample Response:**

```json
{
  "deviation": 4082.48
}
```

---

Once up, the API server will be available at:

```
http://localhost:3000
```

You can test the endpoint:

```
curl http://localhost:3000/api/stats?coin=bitcoin
```

---

## 🧠 Notes

* This server subscribes to an event (`{ trigger: "update" }`) coming from the `worker-server` and responds by executing the `storeCryptoStats()` logic.
* All critical logic for interacting with external APIs and MongoDB lives in `services/`.
* Redis is used for the pub-sub system (or can be swapped with NATS if needed).

---

For full context on how this fits into the overall project, refer to the README in root directory

---

Made with care for the KoinX Internship Assignment, May 2025.
