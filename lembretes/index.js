require('dotenv').config()

// const dotenv = require('dotenv')
// dotenv.config()
const express = require('express')
const app = express()
app.use(express.json())

/* 
{
  "1": {id: "1", texto: "Fazer café"},
  "2": {id: "2", texto: "Comprar frutas"}
}
*/
let id = 0
const lembretes = {}

//POST localhost:4000/lembretes {"texto": "Fazer café"}
app.post('/lembretes', (req, res) => {
  const texto = req.body.texto
  id = id + 1
  lembretes[id] = {id, texto}
  res.status(201).json(lembretes[id])
})

//GET localhost:4000/lembretes 
app.get('/lembretes', (req, res) => {
  res.send(lembretes)  
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Lembretes. Porta ${PORT}`))
