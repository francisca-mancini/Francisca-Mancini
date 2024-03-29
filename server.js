const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/product', (req, res) => {
    return app.render(req, res, '/404', { handle: req.params.handle });
  });

  server.get('/collection', (req, res) => {
    return app.render(req, res, '/404', { handle: req.params.handle });
  });

  server.get('/product/:handle', (req, res) => {
    return app.render(req, res, '/product', { handle: req.params.handle });
  });

  server.get('/shop/:handle', (req, res) => {
    return app.render(req, res, '/shop', { handle: req.params.handle });
  });

  server.get('/collection/:handle', (req, res) => {
    return app.render(req, res, '/collection', { handle: req.params.handle });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
