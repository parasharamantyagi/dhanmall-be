module.exports = {
  MONGO_USERNAME: process.env.MONGO_USERNAME,// db cloud info
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,

  CRYPTOJS_SECRET: process.env.CRYPTOJS_SECRET, // use for user password incrypt

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID, // use for send sms
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN, // verify user authantication

  GDM_MODULE: {
    jwt: require("jsonwebtoken"),
    CryptoJS: require('crypto-js')
  },
  GDM_CHARGES_FEE: 0.05
}