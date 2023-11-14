//ISSO JA ESTA FUNCIONANDO
// const express = require('express'); // importa o express
// var http = require('http');
// let app = express();


// // use it before all route definitions

// app.post("/adicionarUsuario", ( req,res) => {
//     res.setHeader('Content-Type', 'application/json');

//     return res.end(JSON.stringify({ a: 2 }));

// })

// app.listen(3030, () => {
//     console.log('O SERVIDOR ESTÁ RODANDO NA PORTA 3030');
// })

//import express from 'express';
const express = require('express');
const admin = require('firebase-admin');
const rotas = require('../teste-BackEnd/rotas')
const router = express.Router();
const orderController = require('../teste-BackEnd/controllers/orderController');
let app = express();

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json')
});


app.get('/usuarios', (req, res) => {
    console.log('GET usuarios');
    admin.firestore()
    .collection('usuarios')
    .get()
    .then(snapshot => {
       const usuarios = snapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
       }))
    res.json(usuarios);

    })
})
const cors = require('cors')
//import cors from 'cors';
const Gerencianet = require('gn-api-sdk-node')
const options = require('../teste-BackEnd/credentials.json')
const gerencianet = new Gerencianet(options)

app.use(cors({origin: 'http://localhost:8100'}));

app.get('/produtos', (req, res) => {
  console.log('GET produtos');
  admin.firestore()
  .collection('produtos')
  .get()
  .then(snapshot => {
     const produtos = snapshot.docs.map(doc => ({
      ...doc.data(),
      uid: doc.id
     }))
  res.json(produtos);

  })
})

app.post('/:orderId/pix/billing',  async (req, res) => {
    let chargeInput = {
      items: [
        {
          name: 'Product A',
          value: 1000,
          amount: 2,
        },
      ],
    }

    gerencianet
      .createCharge({}, chargeInput)
      .then((resposta) => {
        console.log(resposta)
        res.status(200).send({ msg: "Authentication", response : resposta.data})
      })
      .catch((error) => {
        console.log(error)
      })
    })

app.post('/usuarios', async (req, res) => {
  admin.firestore()
  .collection('usuarios').add({
    cargo: req.body.cargo,
    descricaoCargo: req.body.descricaoCargo,
    email: req.body.email,
    empresa: req.body.empresa,
    idUsuario: req.body.idUsuario,
    nome: req.body.nome,
    senha: req.body.senha
  })

  const data = req.body;
 
  res.status(200).send({ msg: "Usuario criado com sucesso", response : res.data})

})


app.listen(3030, () => {
    console.log('O SERVIDOR ESTÁ RODANDO NA PORTA 3030');
})

module.exports = router