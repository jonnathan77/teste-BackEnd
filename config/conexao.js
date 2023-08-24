const mysql = require('mysql');
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234*',
    port:3306,
    database: 'db_basico'
});

conexao.connect (erro => 
    {
    if (erro) {
        console.log (erro)
    }
    else
    {
        console.log (`conectado com sucesso`)
        const app = customExpress ();

        app.listen (3000,() => console.log('servidor rodando na porta 3000'));
    }
}
)


module.exports= conexao;