const { User } = require('../models')

module.exports.createUser = async (req, res, next) => {
  try {
    const { body: validatedUser } = req
    const user = await new User(validatedUser)
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send('CANT CREATE USER')
  }
}

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send('NO USERS')
  }
}

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req

    const foundUser = await User.findOne(id)
    res.status(200).send(foundUser)
  } catch (error) {
    res.status(404).send('NO USER')
  }
}

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
      body
    } = req

    const foundUser = await User.findOne(id)

    const updatedUser = await foundUser.update(body)

    res.status(202).send(updatedUser)
  } catch (error) {
    res.status(400).send('Cant update')
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { params } = req

    const foundUser = await User.findOne(params.id)
    const verdict = await foundUser.delete()

    res.send({ verdict })
  } catch (error) {
    res.status(400).send('CANT DELETE')
  }
}
