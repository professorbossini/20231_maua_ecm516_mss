require('dotenv').config()
const express = require ('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT
app.use(express.json())

const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: (observacao) => {
    observacao.status = 
      observacao.texto.includes(palavraChave) ?
      'importante' :
      'comum' 
    axios.post('http://localhost:10000/eventos', {
      tipo: 'ObservacaoClassificada',
      dados: observacao  
    })    
  }  
}
//POST host:porta/eventos
app.post('/eventos', (req, res) => {
  try{
    const evento = req.body
    //callable
    funcoes[evento.tipo](evento.dados)
  }
  catch (e){

  }
  res.status(200).json({msg: 'ok'})
})

app.listen(PORT, () => console.log (`Classificação. Porta ${PORT}`))