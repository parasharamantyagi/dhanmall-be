const ALL_MESSAGE = require("./message");

module.exports = {
  PORT: process.env.PORT || 7000, // db cloud info
  APP_URL: process.env.APP_URL || "http://be.luckydhanmall.com", // db cloud info
  MONGO_DB: process.env.MONGO_DB, // db cloud info
  MONGO_USERNAME: process.env.MONGO_USERNAME, // db cloud info
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,

  CRYPTOJS_SECRET: process.env.CRYPTOJS_SECRET, // use for user password incrypt

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID, // use for send sms
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

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
  USER_COMMISION: {
    LAVEL_1: 20,
    LAVEL_2: 5,
    LAVEL_3: 2,
  },
};
