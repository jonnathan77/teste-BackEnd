const rotas = require('express').Router()
const conexao = require('./config/conexao')

// Colocamos todas as rotas
//get veiculos
rotas.get('/', (req, res)=>{
    let sql = 'select * from tb_veiculos'
    conexao.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get um veiculo
rotas.get('/:id', (req, res)=>{
    const {id}= req.params
    let sql = 'select * from tb_veiculos where id = ?'
    conexao.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//incluir veiculo
rotas.post('/', (req, res)=>{
    const{placa, chassi, renavam, modelo, marca, ano} = req.body

    let sql = `insert into tb_veiculos(placa, chassi, renavam, modelo, marca, ano) values('${placa}', '${chassi}','${renavam}', '${modelo}','${marca}', '${ano}')`

    conexao.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Veiculo incluido'})
        }
    })
})

//excluir
rotas.delete('/:id', (req, res)=>{
    const{id}=req.params

    let sql = `delete from tb_veiculos where id = '${id}'`

    conexao.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Veiculo deletado'})
        }
    })
})

//alterar veiculo
rotas.put('/:id', (req, res)=>{
    const{id}=req.params
    const{placa, chassi, renavam, modelo, marca, ano} = req.body

    let sql = `update tb_veiculos set 
                placa = '${placa}',
                chassi = '${chassi}',
                renavam = '${renavam}',
                modelo = '${modelo}', 
                marca = '${marca}', 
                ano = '${ano}'
                where id = '${id}'`
    conexao.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Veiculo alterado'})
        }
    })
})

//---------------------------



module.exports= rotas;

