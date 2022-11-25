import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';
import config from './config';

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

//without express
/*const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    console.log('GET /');
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});*/
