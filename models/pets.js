const conexao = require('../infraestrutura/database/conexao')
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')

class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'
        //O novo caminho ja está sendo setado dentro o uploadDeArquivos.js
        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho }
                conexao.query(query, novoPet, (erro, resultado) => {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.status(200).json(novoPet);
                    }
                })
            }
        })
    }
}

module.exports = new Pet()