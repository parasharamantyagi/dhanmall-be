const ALL_MESSAGE = require("./message");

module.exports = {
  PORT: process.env.PORT || 7000, // db cloud info
  APP_URL: process.env.APP_URL || "http://luckydhanmall.com", // db cloud info
  MY_NODE_ENV: process.env.NODE_ENV === "production" ? true : false,
  APP_VERSION: "0.0.1",
  MONGO_DB: process.env.MONGO_DB, // db cloud info
  MONGO_USERNAME: process.env.MONGO_USERNAME, // db cloud info
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,

  CRYPTOJS_SECRET: process.env.CRYPTOJS_SECRET, // use for user password incrypt

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID, // use for send sms
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

  FAST2SMS_KEY: process.env.FAST2SMS_KEY,

  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN, // verify user authantication

  MESSAGE: ALL_MESSAGE,

  GDM_MODULE: {
    jwt: require("jsonwebtoken"),
    CryptoJS: require("crypto-js"),
    mongoose: require("mongoose"),
    mongooseFloat: require("mongoose-float"),
    rn: require("random-number"),
  },
  GDM_CHARGES_FEE: 0.05,
  PAGINATION_DEFAULT_LIMIT: 10,
  USER_FIRST_COMMISION: {
    LAVEL_1: 20,
    LAVEL_2: 5,
    LAVEL_3: 2,
    LAVEL_4: 1,
  },
  USER_NORMAL_COMMISION: {
    LAVEL_1: 10,
    LAVEL_2: 2.5,
    LAVEL_3: 1,
    LAVEL_4: 0.5,
  },
};
