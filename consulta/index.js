require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const baseConsulta = {}

//LembreteCriado: () => {}
//ObservacaoCriada: () => {}
const funcoes = {
  LembreteCriado: (lembrete) => {
    baseConsulta[lembrete.id] = lembrete  
  },
  ObservacaoCriada: (observacao) => {
    //1.
    //pegar a coleção de observações associada ao id de lembrete da observação recebida se ela existir
    //senão, pegar uma coleção vazia (lembrar do operador [])
    const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
    //2.
    //adicionar a observacao recebida à coleção (push)
    observacoes.push(observacao)

    //3. atualizar a coleção de observações associada ao id de lembrete da observação recebida
    baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
  },
  ObservacaoAtualizada: (observacao) => {
    const observacoes = baseConsulta[observacao.lembreteId]['observacoes']
    const indice = observacoes.findIndex(o => o.id === observacao.id)
    observacoes[indice] = observacao
  }
}
// {
//   1: {
//     id: 1,
//     texto: 'Fazer cafe',
//     observacoes: [
//       {
//         id: 1000,
//         texto: 'comprar açucar',
//         lembreteId: 1
//       },
//       {
//         id: 1001,
//         texto: 'entre 4h e 6h',
//         lembreteId: 1
//       }
//     ]
//   },
//   2: {
//     id: 2,
//     texto: 'Fazer cafe',
//     observacoes: [
//       {
//         id: 1000,
//         texto: 'comprar açucar',
//         lembreteId: 2
//       },
//       {
//         id: 1001,
//         texto: 'entre 4h e 6h',
//         lembreteId: 2
//       }
//     ]
//   }
// }



app.get('/lembretes', (req, res) => {
  res.status(200).send(baseConsulta)
})

app.post('/eventos', (req, res) => {
  try{
    const evento = req.body // {tipo: .... , dados: ...}
    const funcao = funcoes[evento.tipo]
    funcao(evento.dados)
  }
  catch(e){

  }
  res.status(200).json({msg: 'ok'})
  //na apostila funcoes[req.body.tipo](req.body.dados)
})

app.listen(process.env.PORT, async () => {
  const resp = await axios.get('http://localhost:10000/eventos')
  resp.data.forEach((evento) => {
    try{
      funcoes[evento.tipo](evento.dados)
    }catch(e){}
  })
  console.log(`Consulta. Porta ${process.env.PORT}`)
})

