//importando bibliotecas de node_modules
const express = require('express')
const Cors = require('cors')
const bodyParser = require('body-parser')

//importando modulos
const { routes } = require('./routes')

const app = express() //iniciando aplicacao

app.use(Cors()) //adicionando biblioteca para acesso externo
app.use(bodyParser.json()) //adicionando biblioteca para leitura do body recebido via request
app.use(routes) //adicionando as rotas da aplicacao

const PORT = 3001 //porta da aplicacao
const HOST = '0.0.0.0' // host da aplicacao

app.listen(PORT, HOST) //rodandno aplicacao na porta e host indicados
