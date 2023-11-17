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
const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
const orderController = require("../teste-BackEnd/controllers/orderController");
let app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json"),
});

app.get("/usuarios", (req, res) => {
  console.log("GET usuarios");
  admin
    .firestore()
    .collection("usuarios")
    .get()
    .then((snapshot) => {
      const usuarios = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      res.json(usuarios);
    });
});
const cors = require("cors");
//import cors from 'cors';
const Gerencianet = require("gn-api-sdk-node");
const options = require("../teste-BackEnd/credentials.json");
const fs = require("fs");
const Endpoints = require("gn-api-sdk-node/lib/endpoints");

var options2 = {
  sandbox: false,
  client_id: "Client_Id_42ec262b92fa4d1e2e71b70a30c828f0687935b0",
  client_secret: "Client_Secret_ca3037a3f596246b896e5b0569989ce3ce373823",
  pix_cert: __dirname + "/producao-516895-certificadoChicapp.p12",
};
const gerencianet = new Gerencianet(options2);

app.use(cors({ origin: "http://localhost:8100" }));

app.get("/produtos", (req, res) => {
  console.log("GET produtos");
  admin
    .firestore()
    .collection("produtos")
    .get()
    .then((snapshot) => {
      const produtos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      res.json(produtos);
    });
});

app.post("/gerarToken", async (req, res) => {
  try {
    let body = {
      calendario: {
        expiracao: 3600,
      },
      devedor: {
        cpf: "94271564656",
        nome: "Gorbadock Oldbuck",
      },
      valor: {
        original: "1.45",
      },
      chave: "8d248b0f-279b-471a-9d11-a2b7d663aedf", // Informe sua chave Pix cadastrada na gerencianet
      infoAdicionais: [
        {
          nome: "Pagamento em",
          valor: "NOME DO SEU ESTABELECIMENTO",
        },
        {
          nome: "Pedido",
          valor: "NUMERO DO PEDIDO DO CLIENTE",
        },
      ],
    };

    gerencianet
      .pixCreateImmediateCharge([], body)
      .then((resposta) => {
        const txId = {
          id: resposta.loc.id
        } 

        gerencianet
          .pixGenerateQRCode(txId)
          .then((resposta) => {
            console.log(resposta);
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        console.log(error);
      });

    /*const body = {
   /*   calendario: {
        expiracao: 3600,
        criacao: "1990-12-31T23:59:60Z",
      },*/
    /* devedor: {
        cpf: "70147286603",
        nome: "Jonnathan Cruz",
      },
      valor: {
        original: "100.00",
      },
      items: [
        {
          name: 'Massa de modelar',
          value: 100000
        }
      ],
     /* chave: "8d248b0f-279b-471a-9d11-a2b7d663aedf",
      solicitacaoPagador: "Cobranca dos servicos prestados.",
    };

   /*   var teste23 = await gerencianet.pixCreateImmediateCharge(body).then((resposta) => {
      console.log(resposta)
    })

      //gerarQrCode


     gerencianet
        .createCharge({}, body)
        .then((resposta) => {
          //console.log(resposta)
          res.status(200).send({ msg: "Authentication", response : resposta.data})
      
          const cert = fs.readFileSync('producao-516895-certificadoChicapp.p12');
          
          Endpoints.options = cert
          var params = resposta.data.charge_id
          gerencianet
          .pixGenerateQRCode([], params)
            .then((resposta) => {
              console.log(resposta)
            })
            .catch((error) => {
              console.log(error)
            })

        })
        .catch((error) => {
          console.log(error)
        })
*/
  } catch (error) {
    console.log(error);
  }
});

app.post("/usuarios", async (req, res) => {
  admin.firestore().collection("usuarios").add({
    cargo: req.body.cargo,
    descricaoCargo: req.body.descricaoCargo,
    email: req.body.email,
    empresa: req.body.empresa,
    idUsuario: req.body.idUsuario,
    nome: req.body.nome,
    senha: req.body.senha,
  });

  const data = req.body;

  res
    .status(200)
    .send({ msg: "Usuario criado com sucesso", response: res.data });
});

app.listen(3030, () => {
  console.log("O SERVIDOR ESTÁ RODANDO NA PORTA 3030");
});

module.exports = router;
