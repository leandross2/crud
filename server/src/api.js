//importando bibliotecas de node_modules
const axios = require('axios')

//url base da api
axios.defaults.baseURL = 'https://demo.vnda.com.br/api/v2'
// token de autoriazação da api
axios.defaults.headers.common['Authorization'] =
  'Token token="H1xTNT8P4zc2HZ22mHa7oKBc"'

/**
 * READ
 * Faz a busca de um usuario pelo id
 * * @param {number} id - dados do usuario
 * @returns {Object} - lista dos usuario ou erro { type: 'sucess', data: req.data } ou { type: 'error', data: err.response.data }
 */
const getUsersById = async id => {
  try {
    const req = await axios.get(`/users/${id}`)
    return { type: 'sucess', data: req.data }
  } catch (err) {
    return { type: 'error', message: err.response.data }
  }
}
/**
 * READ
 * Retorna uma lista de todos os cadastrados usuarios
 * @returns {Object} - lista dos usuario ou erro { type: 'sucess', data: req.data } ou { type: 'error', data: err.response.data }
 */
const getAllUsers = async () => {
  try {
    const req = await axios.get('/users')
    return { type: 'sucess', data: req.data }
  } catch (err) {
    return { type: 'error', message: err.response.data }
  }
}

/**
 * CREATE
 * Registra um usuario
 * @param {Object} body - dados do usuario
 * @returns {Object}  - retorna usuario cadastrado ou erro { type: 'sucess', data: req.data } ou { type: 'error', data: err.response.data }
 */
const registerUser = async body => {
  try {
    const req = await axios.post('/users', body)
    return { type: 'sucess', data: req.data }
  } catch (err) {
    return { type: 'error', data: err.response.data }
  }
}

/**
 * UPDATE
 * Encontra um usuario pelo ID e edita os atributos passados pelo body
 * @param {Number} id id do usuario que deve ser alterado
 * @param {Object} body atributos do usuario que devem ser alterados
 * @returns {Object} retorna sucesso ou erro { type: 'sucess', data: req.data } ou { type: 'error', data: err.response.data }
 */
const updateUser = async (id, body) => {
  try {
    const req = await axios.patch(`/users/${id}`, body)
    return { type: 'sucess', data: req.data }
  } catch (err) {
    return { type: 'error', data: err.response.data }
  }
}

/**
 * DELETE
 * Encontra um usuario pelo ID e o deleta
 * @param {Number} id - Id do usuario que deve ser deletado
 * @returns {Object} - retorna sucesso ou erro { type: 'sucess', data: req.data } ou { type: 'error', data: err.response.data }
 */
const deleteUser = async id => {
  try {
    const req = await axios.delete(`/users/${id}`)
    return { type: 'sucess', data: req.data }
  } catch (err) {
    return { type: 'error', data: err.response.data }
  }
}
//exportando metodos
module.exports = {
  getAllUsers,
  getUsersById,
  registerUser,
  updateUser,
  deleteUser
}
