const yup = require('yup')

const validationSchema = yup.object({
  body: yup
    .string()
    .trim()
    .required(),
  isDone: yup.boolean().required()
})

module.exports = async (req, res, next) => {
  try {
    req.body = await validationSchema.validate(req.body)
    next()
  } catch (error) {
    res.status(400).send(error.message) // NOT CORRECT
  }
}
