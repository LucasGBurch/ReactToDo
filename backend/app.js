const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { v4: uuidv4 } = require('uuid');

const ErroHttp = require('./models/erro-http');

const configuracaoProxy = createProxyMiddleware({
  target: 'https://6387a14cd9b24b1be3f61500.mockapi.io',
  changeOrigin: true,
});

const app = express();

app.use('/api/todo', configuracaoProxy);

app.use((req, res, next) => {
  const erro = new ErroHttp('Rota não encontrada.', 404);
  throw erro;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'Ocorreu um erro desconhecido!' });
});

app.listen(3001);
console.log('Servidor ouvindo à porta 3001. Código de acesso: ' + uuidv4());
console.log('Abrindo em http://localhost:3001/api/todo');
