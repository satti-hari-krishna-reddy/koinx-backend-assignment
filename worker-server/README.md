# Worker Server - KoinX Backend Internship Assignment

This is the background job service for the KoinX backend internship take-home assignment.

## What It Does

The `worker-server` is a lightweight Node.js service that periodically publishes an event to a Redis Pub/Sub channel. This acts as a trigger for the `api-server` to collect fresh cryptocurrency statistics from CoinGecko.

### Key Features

* Immediately publishes a `{ trigger: "update" }` event on startup.
* Publishes the same event every **15 minutes** on an interval.
* Event publishing is done using **Redis Pub/Sub**.

## Folder Contents

```bash
worker-server/
├── Dockerfile           # Container setup for the worker
├── package.json         # Project dependencies and metadata
├── package-lock.json    # Dependency lockfile
├── worker.js            # Main background worker logic
```

## How It Fits Into the System

This worker is completely decoupled from the API server. It doesn’t make API calls or touch the database. Its sole responsibility is to **publish an update signal** at regular intervals. The actual data fetching and storage logic lives in the `api-server`.
