var express = require("express");
const AWS = require("aws-sdk");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    // AWS.config.update({
    //   accessKeyId: "AKIA4K7KVDPD255KUF6I",
    //   secretAccessKey: "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",
    //   region: "us-east-1",
    // });
    // let message = `Hello gmt check otp`;

    // var publishTextPromise = new AWS.SNS()
    //   .publish({
    //     Message: message,
    //     Subject: "Trip Status",
    //     PhoneNumber: "+916239463839",
    //   })
    //   .promise();
    // publishTextPromise
    //   .then(function (data) {
    //     console.log("data", data);
    //     return true;
    //   })
    //   .catch(function (err) {
    //     console.log("err", err);
    //     return err;
    //   });
    return res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
