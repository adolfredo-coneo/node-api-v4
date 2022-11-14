const app = require('./server');

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
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
