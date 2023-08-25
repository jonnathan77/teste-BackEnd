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

import express from 'express';
import admin from 'firebase-admin';

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

import cors from 'cors';

app.use(cors({origin: 'http://localhost:8101'}));

app.post('/usuarios', async (req, res) => {
  const data = req.body;
 
  res.status(200).send({ msg: "Usuario criado com sucesso"})

})


app.listen(3030, () => {
    console.log('O SERVIDOR ESTÁ RODANDO NA PORTA 3030');
})