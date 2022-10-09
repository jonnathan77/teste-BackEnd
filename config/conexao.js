const mysql = require('mysql');
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234*',
    port:3306,
    database: 'db_basico'
});

conexao.connect((err)=>{
    if(err){
        console.log('Erro na conexão' + err)
    }else{
        console.log('Sucesso na conexão!!')
    }
});

module.exports= conexao;