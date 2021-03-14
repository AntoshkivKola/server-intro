const db = new Map()

class Task {
  constructor ({ body, isDone }) {
    this.body = body
    this.isDone = isDone
    this.id = `${db.size + 1}`

    const time = new Date()
    this.createdAt = time
    this.updatedAt = time

    return Promise.resolve(this)
  }

  async update (values) {
    const oldTask = db.get(this.id)

    const newTask = await new Task({
      ...oldTask,
      ...values
    })

    newTask.id = oldTask.id
    newTask.createdAt = oldTask.createdAt

   //db.set(oldTask.id, newTask)
    Task.save(newTask)
    return newTask
  }

  async delete () {
    return db.delete(this.id)
  }
}
Task.save = async task => {
  return db.set(task.id, task)
}

Task.deleteById = async id => {
  return db.delete(id)
}

Task.findOne = async id => {
  return db.get(id)
}

Task.findAll = async () => {
  return [...db.values()]
}

module.exports = Task
