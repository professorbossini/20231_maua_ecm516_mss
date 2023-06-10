require('dotenv').config()
const express = require('express')
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
  }
}