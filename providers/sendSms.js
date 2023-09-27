const AWS = require("aws-sdk");
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MY_NODE_ENV,
} = require("../config");

module.exports.awsSendSms = async function (mobileNo, message) {
  if (MY_NODE_ENV) {
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: "us-east-1",
    });

    var publishTextPromise = new AWS.SNS()
      .publish({
        Message: message,
        Subject: "User register",
        PhoneNumber: mobileNo,
      })
      .promise();
    publishTextPromise
      .then(function (data) {
        return true;
      })
      .catch(function (err) {
        return err;
      });
    return true;
  } else {
    return false;
  }
};
