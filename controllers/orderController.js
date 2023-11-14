const fs = require('fs');
const credenciais = require('../credentials.json');
const https = require('https');
const axios = require('axios');

exports.oAuthGerencianet = async (req, res, next) => {
    try{

        const cert = fs.readFileSync('producao-516895-certificadoChicapp.p12');
        const credentials = credenciais.client_id + ':' + credenciais.client_secret;
        const auth = Buffer.from(credenciais).toString('base64')

        const agent = https.Agent({
            pfx: cert,
            passphrase: ''
        });

        const data = JSON.stringify({ "grant-type" : "client_credentials"});

        const config = {
            method: 'POST',
            url: 'https://api-pix.gerencianet.com.br/oauth/token',
            headers: {
                Authorization: 'Basic ' + auth,
                'Content-Type': 'aplication/json'
            },
            httpsAgent: agent,
            data: data
        }

        axios(config)
        .then((response) => {
            console.log(response.data)
            next();
        })

    }catch (error) {
        return res.status(500).send({ error: error})
    }
}