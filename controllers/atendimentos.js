module.exports = app =>{
    app.get('/atendimentos', (req, res)=>{
        res.send('Servidor rodando, tudo ok');
    })

    app.post('/atendimentos', (req, res)=>{
        console.log(req.body);
        res.send('Vc ta na rota de atendimentos usando POST')
    })
}