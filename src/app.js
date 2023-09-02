const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./models/page-model');
const getNotionPage = require('./services/page-service');

const app = express();

app.use('/api/v1/pages/:id', getNotionPage);

app.listen(process.env.PORT, () => {
  console.log(`connect to ${process.env.PORT}`);
});
