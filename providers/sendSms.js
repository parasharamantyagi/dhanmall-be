const AWS = require("aws-sdk");
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MY_NODE_ENV,
  // TWILIO_ACCOUNT_SID,
  // TWILIO_AUTH_TOKEN,
  FAST2SMS_KEY,
} = require("../config");
// const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
var unirest = require("unirest");
const { removeFirstThreeCharacters } = require("../helpers");

module.exports.sendSmsToMobile = async function (mobileNo, otpMessage) {
  if (MY_NODE_ENV) {
    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
    req.query({
      authorization: FAST2SMS_KEY,
      variables_values: otpMessage,
      route: "otp",
      numbers: removeFirstThreeCharacters(mobileNo),
    });
    req.headers({
      "cache-control": "no-cache",
    });
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    });
    return "Please verify you Otp";
  } else {
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: "us-east-1",
    });
    var publishTextPromise = new AWS.SNS()
      .publish({
        Message: `Your one time otp is ${otpMessage}`,
        Subject: "User register",
        PhoneNumber: mobileNo,
      })
      .promise();
    publishTextPromise.then(function (data) {}).catch(function (err) {});
    return "Please verify you Otp";
  }
};
