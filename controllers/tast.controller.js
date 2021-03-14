const { Task } = require('../models')

module.exports.createTask = async (req, res, next) => {
  try {
    const { body: validatedTask } = req
    const Task = await new Task(validatedTask)
    Task.save(validatedTask)
    res.status(201).send(Task)
  } catch (error) {
    res.status(400).send('CANT CREATE Task')
  }
}

module.exports.getTasks = async (req, res, next) => {
  try {
    const Tasks = await Task.findAll()
    res.status(200).send(Tasks)
  } catch (error) {
    res.status(404).send('NO TaskS')
  }
}

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req

    const foundTask = await Task.findOne(id)
    res.status(200).send(foundTask)
  } catch (error) {
    res.status(404).send('NO Task')
  }
}

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { id },
      body
    } = req

    const foundTask = await Task.findOne(id)

    const updatedTask = await foundTask.update(body)

    res.status(202).send(updatedTask)
  } catch (error) {
    res.status(400).send('Cant update')
  }
}

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { params } = req

    const foundTask = await Task.findOne(params.id)
    const verdict = await foundTask.delete()

    res.send({ verdict })
  } catch (error) {
    res.status(400).send('CANT DELETE')
  }
}
