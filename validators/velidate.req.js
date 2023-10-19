const { body } = require("express-validator");

exports.registerValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().isLength({ min: 12 }).withMessage("Provide valid mobile"),
  body("password").exists().withMessage("Password is required").isString().withMessage("Password should be string")
    .isLength({ min: 5 }).withMessage("Password should be at least 5 characters"),
  body("verification_code").isLength({ min: 6 }).exists().withMessage("Verification code is required"),
  // body("recommendation_code").exists().withMessage("Recommendation code is required"),
];

exports.changePasswordValidator = [
  body("old_password").exists().withMessage("Old Password is required").isLength({ min: 6 }).withMessage("Old Password should be at least 6 characters"),
  body("new_password").exists().withMessage("New Password is required").isLength({ min: 6 }).withMessage("New Password should be at least 6 characters"),
  body("confirm_password").exists().withMessage("Confirm Password is required").isLength({ min: 6 }).withMessage("Confirm Password should be at least 6 characters"),
];

exports.otpVerifyValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().isLength({ min: 12 }).withMessage("Provide valid mobile"),
];

exports.loginValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().isLength({ min: 12 }).withMessage("Provide valid mobile"),
  body("password").exists().isLength({ min: 6 }).withMessage("Password is required").isString(),
];

exports.resetPasswordValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().isLength({ min: 12 }).withMessage("Provide valid mobile"),
  body("verification_code").isLength({ min: 6 }).exists().withMessage("Verification code is required"),
  body("password").exists().withMessage("Password is required").isLength({ min: 6 }).withMessage("Please provide a valid mobile number"),
];

exports.addRechargeValidator = [
  body("ammount").exists().isLength({ min: 3 }).withMessage("Provide valid ammount"),
  body("transaction_id").exists().withMessage("Transaction id is required").isLength({ min: 8 }).withMessage("This is invalid Transaction id"),
];

exports.verifyNumberValidator = [
  // body("nickname").exists({ checkFalsy: true }).withMessage("Nickname is required"),
  body("mobile").exists().withMessage("Mobile number is required").isLength({ min: 10 }).withMessage("Please provide a valid mobile number"),
];

exports.saveBankCardValidator = [
  body("actual_name").exists().isLength({ min: 1 }).withMessage("Actual name is required"),
  body("type").exists().isLength({ min: 1 }).withMessage("Account type is required"),
  // body('type', "Please Fill All Fields Of Your Billing Address").custom((value) => {
  // if (value === 'bank') {
  //       [
  //         body("ifsc_code").exists().isLength({ min: 1 }).withMessage("Ifsc code is required"),
  //         body("bank_name").exists().isLength({ min: 1 }).withMessage("Bank name is required"),
  //         body("bank_account").exists().isLength({ min: 1 }).withMessage("Bank account number is required"),
  //       ]
  //     } else {
  //       [
  //         body("upi_id").exists().isLength({ min: 1 }).withMessage("Upi id is required"),
  //       ]
  //       // return Promise.resolve();
  //     }
  // }),
  body("state").exists().isLength({ min: 1 }).withMessage("State number is required"),
  body("city").exists().isLength({ min: 1 }).withMessage("City number is required"),
  body("address").exists().isLength({ min: 1 }).withMessage("Address number is required"),
  // body("email").exists().isLength({ min: 1 }).withMessage("Email number is required"),
];
