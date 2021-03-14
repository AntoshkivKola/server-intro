const express = require('express')
const validateBody = require('./middleware/validate.mw')
const UserController = require('./controllers/user.controller')

const app = express() // Создание сервера

const bodyParser = express.json()

/* ROUTING: METHOD PATH */
app.get('/users', UserController.getUsers)
app.get('/user/:id', UserController.getUser)
app.post('/user', bodyParser, validateBody, UserController.createUser)
app.put('/user/:id', bodyParser, validateBody, UserController.updateUser)
app.delete('/user/:id', UserController.deleteUser)

module.exports = app
