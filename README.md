# KoinX Backend Assignment

This project was created as part of the take-home backend assignment for the **KoinX Backend Internship - May 2025**.

The assignment involves building a full-stack backend system that interacts with external APIs (CoinGecko), MongoDB, and communicates between two servers using Redis Pub/Sub (as a replacement for NATS). The system is containerized and deployable.

---
![Koinx](https://github.com/user-attachments/assets/97078474-34ba-4e44-b57a-dc297a310ee5)

---

## ✅ Quickstart (Local Setup)

Follow these steps to run the project locally:

1. **Clone the repository:**

```bash
git clone git@github.com:satti-hari-krishna-reddy/koinx-backend-assignment.git

cd koinx-backend-assignment
```

2. **In the `.env` file** in the root of the project set your API key:

```env
COINGECKO_API_KEY=your_api_key_here
```

3. **Run the entire system using Docker Compose:**

```bash
docker-compose up -d
```

4. **Test the API:**

Once it’s up, hit the following endpoint in your browser or API tool like Postman:

```
GET http://localhost:3000/api/stats?coin=bitcoin
```

Sample Response:

```json
{
    "price": 104245,
    "marketCap": 2071260438359.015,
    "24hChange": 0.28608077947668514
}
```

---

## 🧠 Overview

* The `api-server` contains the main API logic. It handles:

  * Exposing endpoints like `/stats` and `/deviation`
  * Storing fetched data from CoinGecko to MongoDB
  * Listening to Redis Pub/Sub messages to trigger updates

* The `worker-server` contains a background job that runs every 15 minutes. It publishes a message to Redis Pub/Sub with the payload:

```json
{ "trigger": "update" }
```

This triggers the `api-server` to fetch and store fresh crypto stats.

---

## 📂 More Info

To learn more about the internal logic, file structure, and how each part works:

* Go to the `/api-server` folder for the main API server code and documentation
* Go to the `/worker-server` folder for the background job worker and its documentation

---

Happy Reviewing 🚀
