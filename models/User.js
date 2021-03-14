const db = new Map()

class User {
  constructor ({ name, email, gender, isSubscribed }) {
    this.name = name
    this.email = email
    this.gender = gender
    this.isSubscribed = isSubscribed
    this.id = `${db.size + 1}`

    const time = new Date()
    this.createdAt = time
    this.updatedAt = time

    db.set(this.id, this)

    return Promise.resolve(this)
  }

  async update (values) {
    const oldUser = db.get(this.id)

    const newUser = await new User({
      ...oldUser,
      ...values
    })
    const idToDelete = newUser.id
    newUser.id = oldUser.id
    newUser.createdAt = oldUser.createdAt

    db.set(oldUser.id, newUser)
    await User.deleteById(idToDelete)
    return newUser
  }

  async delete () {
    return db.delete(this.id)
  }
}

User.deleteById = async id => {
  return db.delete(id)
}

User.findOne = async id => {
  return db.get(id)
}

User.findAll = async () => {
  return [...db.values()]
}

module.exports = User
