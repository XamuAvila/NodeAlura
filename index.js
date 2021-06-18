const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const app = customExpress()

conexao.connect((erro)=>{
    if(erro){
        console.log(erro)
    }
});

app.listen(3000, ()=>{
    console.log('Servidor On na porta 3000');
})

