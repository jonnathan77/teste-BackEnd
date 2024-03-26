
// const express = require("express");
// const admin = require("firebase-admin");
// var bodyParser = require('body-parser')
// const router = express.Router();
// let app = express();

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// admin.initializeApp({
//   credential: admin.credential.cert("serviceAccountKey.json"),
// });

// app.get("/usuarios", (req, res) => {
//   console.log("GET usuarios");
//   admin
//     .firestore()
//     .collection("usuarios")
//     .get()
//     .then((snapshot) => {
//       const usuarios = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         uid: doc.id,
//       }));
//       res.json(usuarios);
//     });
// });
// const cors = require("cors");
// //import cors from 'cors';
// const Gerencianet = require("gn-api-sdk-node");
// const fs = require("fs");
// const Endpoints = require("gn-api-sdk-node/lib/endpoints");
// const produtos = require("./routes/produtos");


// var options2 = {
//   sandbox: false,
//   client_id: "Client_Id_42ec262b92fa4d1e2e71b70a30c828f0687935b0",
//   client_secret: "Client_Secret_ca3037a3f596246b896e5b0569989ce3ce373823",
//   pix_cert: __dirname + "/producao-516895-certificadoChicapp.p12",
// };
// const gerencianet = new Gerencianet(options2);

// app.use(cors({ origin: "http://localhost:8100" }));

// // Routes
// app.use("/getProdutos", produtos);

// app.get("/produtos", (req, res) => {
//   console.log("GET produtos");
//   admin
//     .firestore()
//     .collection("produtos")
//     .get()
//     .then((snapshot) => {
//       const produtos = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         uid: doc.id,
//       }));
//       res.json(produtos);
//     });
// });

// app.post("/gerarToken", async (req, res) => {
//   try {
//     let body = {
//       calendario: {
//         expiracao: 3600,
//       },
//       devedor: {
//         cpf: "94271564656",
//         nome: "Gorbadock Oldbuck",
//       },
//       valor: {
//         original: "1.45",
//       },
//       chave: "8d248b0f-279b-471a-9d11-a2b7d663aedf", // Informe sua chave Pix cadastrada na gerencianet
//       infoAdicionais: [
//         {
//           nome: "Pagamento em",
//           valor: "NOME DO SEU ESTABELECIMENTO",
//         },
//         {
//           nome: "Pedido",
//           valor: "NUMERO DO PEDIDO DO CLIENTE",
//         },
//       ],
//     };

//     gerencianet
//       .pixCreateImmediateCharge([], body)
//       .then((resposta) => {
//         const txId = {
//           id: resposta.loc.id
//         } 

//         gerencianet
//           .pixGenerateQRCode(txId)
//           .then((resposta) => {
//             return res
//               .status(200)
//               .send({ msg: "QrCode gerado com sucesso", response: resposta });
//           })
//           .catch((error) => {
//             console.log(error);
//           });

//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     /*const body = {
//    /*   calendario: {
//         expiracao: 3600,
//         criacao: "1990-12-31T23:59:60Z",
//       },*/
//     /* devedor: {
//         cpf: "70147286603",
//         nome: "Jonnathan Cruz",
//       },
//       valor: {
//         original: "100.00",
//       },
//       items: [
//         {
//           name: 'Massa de modelar',
//           value: 100000
//         }
//       ],
//      /* chave: "8d248b0f-279b-471a-9d11-a2b7d663aedf",
//       solicitacaoPagador: "Cobranca dos servicos prestados.",
//     };

//    /*   var teste23 = await gerencianet.pixCreateImmediateCharge(body).then((resposta) => {
//       console.log(resposta)
//     })

//       //gerarQrCode


//      gerencianet
//         .createCharge({}, body)
//         .then((resposta) => {
//           //console.log(resposta)
//           res.status(200).send({ msg: "Authentication", response : resposta.data})
      
//           const cert = fs.readFileSync('producao-516895-certificadoChicapp.p12');
          
//           Endpoints.options = cert
//           var params = resposta.data.charge_id
//           gerencianet
//           .pixGenerateQRCode([], params)
//             .then((resposta) => {
//               console.log(resposta)
//             })
//             .catch((error) => {
//               console.log(error)
//             })

//         })
//         .catch((error) => {
//           console.log(error)
//         })
// */
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/usuarios", async (req, res) => {
//   admin.firestore().collection("usuarios").add({
//     cargo: req.body.cargo,
//     descricaoCargo: req.body.descricaoCargo,
//     email: req.body.email,
//     empresa: req.body.empresa,
//     idUsuario: req.body.idUsuario,
//     nome: req.body.nome,
//     senha: req.body.senha,
//   });

//   const data = req.body;

//   res
//     .status(200)
//     .send({ msg: "Usuario criado com sucesso", response: res.data });
// });

// app.listen(process.env.PORT || 3000);

// app.post("/cadastrarProdutos", async (req, res) => {

//   try {
//   console.log(req.body.categoria)
//   await admin.firestore().collection("produtos").add({
//     categoria: req.body.categoria,
//     cor: req.body.cor,
//     descricao: req.body.descricao,
//     empresa: req.body.empresa,
//     id: req.body.id,
//     imagem: req.body.imagem,
//     nomeProduto: req.body.nomeProduto,
//   });

//   const data = req.body;

//   res
//     .status(200)
//     .send({ msg: "Produto cadastrado com sucesso", response: res.data });

//   } catch (error){
//     console.log(error);
//   }
// });



// app.post("/buscarUsuario", async (req, res) => {
//   try {
//     var retorno = {};
//     const email = req.body.usuario;
//     const senha = req.body.senha;

//     console.log(req.body)
//  await admin.firestore().collection('usuarios')
//     .where("email", '==', email)
//     .where("senha", '==', senha)
//     .get().then(querySnapshot => {
//       querySnapshot.forEach(doc => {
//       retorno = doc.data();
//       console.log(retorno)
//     })
//   }) 

//     res
//     .status(200)
//     .send({ msg: "Usuario criado com sucesso", response: retorno });

//       /*
//       CONTINUAR DEPOIS
//     .get()


//     .then((snapshot) => {
//       const usuarios = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         uid: doc.idUsuario,
//       }));
//       res.json(usuarios);
//     });
// */
//   } catch (error) {
//     console.log(error);
//   }
// }
// );

// module.exports = router;










//TESTEEEEEEEEEEEEEEEEEEEEEEEEEEeee


// Import packages
const express = require("express");
const produtos = require("./routes/produtos");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/produtos", produtos);

// connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));

const router = express.Router();
module.exports = router;