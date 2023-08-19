require('dotenv').config()
const express = require ('express')
const axios = require('axios')
const {v4: uuidv4} = require('uuid')
const app = express()
app.use(express.json())

const funcoes = {
  ObservacaoClassificada: (observacao) => {
    //1. buscar a obs na base local

    //2. atualizar o status da obs na base local

    //3. emitir um evento do tipo ObservacaoAtualizada contendo a obs atualizada
  }
}


const observacoesPorLembreteID = {}

//'/lembretes/1/observacoes
///lembretes/2/observacaoes
app.get('/lembretes/:id/observacoes', (req, res) => {
  res.json(observacoesPorLembreteID[req.params.id] || [])  
})

//observação: {texto: 'Whatever'}
/*observacoesPorLembreteID = {
  
}
//id: 1, texto: whatever
observacoesDoLembrete = [{}]
*/
app.post('/lembretes/:id/observacoes', async (req, res) => {
  const idObs = uuidv4()
  const { texto } = req.body
  const observacoesDoLembrete = 
        observacoesPorLembreteID[req.params.id] || []
        observacoesDoLembrete.push({
          id: idObs, 
          texto,
          status: 'aguardando'
        })
        observacoesPorLembreteID[req.params.id] = observacoesDoLembrete
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'ObservacaoCriada',
    dados: {
      id: idObs, 
      texto, 
      lembreteId: req.params.id,
      status: 'aguardando'
    }
  })
  res.status(201).json(observacoesDoLembrete)
})

app.post('/eventos', function (req, res){
  try{
    console.log(req.body)
  }
  catch(e){
    
  }
  res.status(200).send({msg: 'ok'})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Observações. ${PORT}`))
