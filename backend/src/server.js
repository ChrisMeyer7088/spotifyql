const express = require('express');
const morgan = require('morgan');
const { port } = require('./config');
const routes = require('./routes')

const app = express();
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.use('/', routes)

const server = app.listen(parseInt(port || 3000, 10));

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
