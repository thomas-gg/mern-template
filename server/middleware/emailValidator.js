const { check, validationResult } = require('express-validator');

exports.emailValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if(!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(422).json({ success: false, error_message: error })
  }

  next();
}

exports.emailValidator = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please provide a vaild email!')
]
