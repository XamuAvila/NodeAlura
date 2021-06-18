const Atendimento = require('../models/atendimentos')
module.exports = app =>{
    app.get('/atendimentos', (req, res)=>{
        res.send('Servidor rodando, tudo ok');
    })

    app.post('/atendimentos', (req, res)=>{
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
        res.send('Vc ta na rota de atendimentos usando POST')
    })
}