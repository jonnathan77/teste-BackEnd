require('./config/conexao');

const express = require('express');
const port = (process.env.port || 3000);

//express
const app = express();

//
app.use(express.json())

//config
app.set('porta', port);

//rotas
app.use('/api', require('./rotas'))

//Iniciando o express
app.listen(app.get('porta'), (error)=>{
    if(error){
        console.log('erro em inciar o servidor: ' + error)
    }else{
        console.log('Servidor iniciado na porta: '+port)
    }
})