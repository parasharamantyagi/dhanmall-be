const { body } = require("express-validator");

exports.registerValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().isLength({ min: 12 }).withMessage("Provide valid mobile"),
  body("password").exists().withMessage("Password is required").isString().withMessage("Password should be string")
    .isLength({ min: 5 }).withMessage("Password should be at least 5 characters"),
  body("verification_code").isLength({ min: 6 }).exists().withMessage("Verification code is required"),
  body("recommendation_code").exists().withMessage("Recommendation code is required"),
];

exports.loginValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().isLength({ min: 12 }).withMessage("Provide valid mobile"),
  body("password").exists().withMessage("Password is required").isString(),
];

exports.verifyNumberValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().withMessage("Mobile number is required").isLength({ min: 10 }).withMessage("Please provide a valid mobile number"),
];

exports.saveBankCardValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("actual_name").exists().isLength({ min: 1 }).withMessage("Actual name is required"),
  body("ifsc_code").exists().isLength({ min: 1 }).withMessage("Ifsc code is required"),
  body("bank_name").exists().isLength({ min: 1 }).withMessage("Bank name is required"),
  body("bank_account").exists().isLength({ min: 1 }).withMessage("Bank account number is required"),
  body("state").exists().isLength({ min: 1 }).withMessage("State number is required"),
  body("city").exists().isLength({ min: 1 }).withMessage("City number is required"),
  body("address").exists().isLength({ min: 1 }).withMessage("Address number is required"),
  body("email").exists().isLength({ min: 1 }).withMessage("Email number is required"),
];
