const { response } = require('express');
const moment = require('moment');
const { restart } = require('nodemon');
const conexao = require('../infraestrutura/conexao')
class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const nomeValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: nomeValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres"
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos SET ?';
            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultado)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM  atendimentos';
        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos where id = ${id}`;
        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res){
        const sql = `UPDATE atendimentos SET ? WHERE id=?`;
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, id});
            }
           
        })
    }

    deleta(id, res){
        const sql = `DELETE from atendimentos where id=?`;
        conexao.query(sql, id, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento