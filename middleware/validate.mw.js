const yup = require('yup')

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(),
  email: yup
    .string()
    .trim()
    .email()
    .required(),
  password: yup
    .string()
    .trim()
    .required(),
  gender: yup
    .string()
    .trim()
    .required(),
  isSubscribed: yup.boolean()
})

module.exports = async (req, res, next) => {
  try {
    req.body = await validationSchema.validate(req.body)
    next()
  } catch (error) {
    res.status(400).send(error.message) // NOT CORRECT
  }
}
