const fs = require("fs");
const credenciais = require("../credentials.json");
const https = require("https");
const axios = require("axios");
const Gerencianet = require("gn-api-sdk-node");

var options = {
  sandbox: true,
  client_id: 'Client_Id_42ec262b92fa4d1e2e71b70a30c828f0687935b0',
  client_secret: 'Client_Secret_ca3037a3f596246b896e5b0569989ce3ce373823',
  pix_cert: __dirname + '/producao-516895-certificadoChicapp.p12'
};
const gerencianet = new Gerencianet(options);
const RandExp = require("randexp");

exports.oAuthGerencianet = async (req, res, next) => {
  try {
    const cert = fs.readFileSync("producao-516895-certificadoChicapp.p12");
    //Insira os valores de suas credenciais em desenvolvimento do pix
    var credenciais = {
      client_id: "Client_Id_42ec262b92fa4d1e2e71b70a30c828f0687935b0",
      client_secret: "Client_Secret_ca3037a3f596246b896e5b0569989ce3ce373823",
    };

    var data = JSON.stringify({ grant_type: "client_credentials" });
    var data_credentials =
      credenciais.client_id + ":" + credenciais.client_secret;

    // Codificando as credenciais em base64
    var auth = Buffer.from(data_credentials).toString("base64");

    const agent = new https.Agent({
      pfx: cert,
      passphrase: "",
    });
    //Consumo em desenvolvimento da rota post oauth/token
    var config = {
      method: "POST",
      url: "https://pix.api.efipay.com.br/oauth/token",
      headers: {
        Authorization: "Basic " + auth,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
      data: data,
    };

    axios(config)
      .then(async function (response) {
        //console.log(response.data);
        const accessToken = response.data?.access_token;

        const txId = new RandExp(/^[a-zA-Z0-9]{26,35}$/).gen();
        const endpoint = `https://pix.api.efipay.com.br/v2/cob`;

        const body = {
          calendario: {
            expiracao: 3600,
            criacao: "1990-12-31T23:59:60Z",
          },
          devedor: {
            cpf: "70147286603",
            nome: "Jonnathan Cruz",
          },
          valor: {
            original: "100.00",
          },
          chave: "8d248b0f-279b-471a-9d11-a2b7d663aedf",
          solicitacaoPagador: "Cobranca dos servicos prestados.",
        };

        const teste = JSON.stringify(body);
        const config = {
          method: "POST",
          url: endpoint,
          httpsAgent: agent,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: teste,
        };

     
        var teste23 = await gerencianet.pixCreateCharge(txId, body)
        .then((resposta) => {
        })
        .catch((error) => {
          console.log(error)
        })




        /* const config = {
            httpsAgent: agent,
            method: 'PUT',
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'aplication/json'
            }
        } */


        //axios.post(endpoint,body,config).then(console.log)
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
