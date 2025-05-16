const express = require('express');
const cryptoRoutes = require('./routes/cryptoRoutes');


const app = express();
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

module.exports = app;   