const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const app = customExpress()
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect((erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso');
        Tabelas.init(conexao);
        app.listen(3000, () => {
            console.log('Servidor On na porta 3000');
        })
    }
});



