const express = require('express'); // importa o express
const router = express.Router();

const server = express(); // cria uma variável chamada server que chama a função express

const orderController = require('../controllers/orderController');

server.get('/teste', () => {
console.log('teste');
})

router.get('/');

router.post('/gerarToken', orderController.oAuthGerencianet)

module.exports = router
