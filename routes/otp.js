const express = require("express");
const { objectFormat, checkObj, currentDate } = require("../helpers");
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  GDM_MODULE,
} = require("../config");
const { saveOtpVerification } = require("../models/OtpVerifications");
const { otpVerifyValidator } = require("../validators/velidate.req");
const { isValid } = require("../validators");
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const router = express.Router();
const userModel = require("./../models/Users");

/* GET home page. */
router.post("/", [otpVerifyValidator,isValid],async (req, res, next) => {
  try {
    const inputData = objectFormat(req.body, ["mobile", {type: 'registration'}]);
    let user = await userModel.findOne({ mobile: inputData.mobile }, ["mobile"]);
    if (checkObj(user))
      return res
        .status(200)
        .send({ status: 0, message: "This mobile is already use" });
    let otp = GDM_MODULE.rn({ min: 111111, max: 999999, integer: true });
    client.messages
      .create({
        body: `Your one time otp is ${otp}`,
        from: "+12566701744",
        to: `+917347332511`,
      })
      .then((message) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    saveOtpVerification({
      mobile: inputData.mobile,
      type: inputData.type,
      verification_code: otp,
      date: currentDate(),
    });
    return res.status(200).json({
      status: 1,
      message: "Otp send successfully",
      data: {
        date: currentDate(),
      }
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
});
module.exports = router;
