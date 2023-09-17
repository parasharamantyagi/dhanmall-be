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
