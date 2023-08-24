const express = require('express'); // importa o express

const server = express(); // cria uma variável chamada server que chama a função express

server.get('/teste', () => {
console.log('teste');
})