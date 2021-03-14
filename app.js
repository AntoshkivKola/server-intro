const express = require('express')
const validateBody = require('./middleware/validate.mw')
const TaskController = require('./controllers/tast.controller')

const app = express() // Создание сервера

const bodyParser = express.json()

/* ROUTING: METHOD PATH */
app.get('/tasks', TaskController.getTasks)
app.get('/task/:id', TaskController.getTask)
app.post('/task', bodyParser, validateBody, TaskController.createTask)
app.put('/task/:id', bodyParser, validateBody, TaskController.updateTask)
app.delete('/task/:id', TaskController.deleteTask)

module.exports = app
