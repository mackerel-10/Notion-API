const express = require('express');
const dotenv = require('dotenv').config();
const getNotionPage = require('./services/page-service');

const app = express();

app.use('/api/v1/pages/:id', getNotionPage);

app.listen(process.env.PORT, () => {
  console.log(`connect to ${process.env.PORT}`);
});
