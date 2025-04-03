import { createServer } from 'node:http';
import fs from 'node:fs';

const server = createServer((req, res) => {
  // Home page
  if (req.url === '/' || req.url === '' || req.url === '/index.html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('404 Not Found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  } else {
    
    // If it's HTML and in the same folder, load it
    if (req.url.endsWith('.html')) {
      fs.readFile(req.url.slice(1), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });

    // If it's JS and in the same folder, load it
    } else if (req.url.endsWith('.js')) {
      fs.readFile(req.url.slice(1), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        return res.end();
      });
    
    // If it's CSS and in the same folder, load it
    } else if (req.url.endsWith('.css')) {
      fs.readFile(req.url.slice(1), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        return res.end();
      });
   
    // If it's CSV and in the same folder, load it
    } else if (req.url.endsWith('.csv')) {
      fs.readFile(req.url.slice(1), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/csv' });
        res.write(data);
        return res.end();
      });

    // If it's SVG and in the same folder, load it
    } else if (req.url.endsWith('.svg')) {
      fs.readFile(req.url.slice(1), (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
        res.write(data);
        return res.end();
      });
  
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }
  }
  
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
