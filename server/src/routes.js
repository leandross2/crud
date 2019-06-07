//importando bibliotecas de node_modules
const { Router } = require('express')
//importando modulos
const {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUsersById
} = require('./api')

//instanciando rotas
const routes = Router()

//retorna lista de usuarios
routes.get('/users/:id', async (req, res) => {
  const response = await getUsersById(req.params.id)
  res.send(response)
})
//retorna lista de usuarios
routes.get('/users', async (req, res) => {
  const response = await getAllUsers()
  res.send(response)
})

//Cadastra um novo usuario
routes.post('/users', async (req, res) => {
  const response = await registerUser(req.body)
  res.json(response)
})

//edita um usuario existente
routes.patch('/users/:id', async (req, res) => {
  const response = await updateUser(req.params.id, req.body)
  res.json(response)
})
//deleta um usuario existente
routes.delete('/users/:id', async (req, res) => {
  const response = await deleteUser(req.params.id)
  res.json(response)
})

module.exports = { routes }
