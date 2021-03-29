const express = require('express');
const morgan = require('morgan');
const { port } = require('./config');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(morgan(':method :url :status :response-time ms'))
  .use(express.json())
  .use(cors())
  .use('/', routes);

const server = app.listen(parseInt(port || 3000, 10));

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
