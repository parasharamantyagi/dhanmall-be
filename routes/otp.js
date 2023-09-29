const express = require("express");
const { objectFormat, checkObj, currentDate } = require("../helpers");
const {
  GDM_MODULE,
  // MESSAGE
} = require("../config");
const { saveOtpVerification } = require("../models/OtpVerifications");
const { otpVerifyValidator } = require("../validators/velidate.req");
const { isValid } = require("../validators");

const router = express.Router();
const userModel = require("./../models/Users");
const { sendSmsToMobile } = require("../providers/sendSms");

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
   let message = await sendSmsToMobile(inputData.mobile,otp);
    saveOtpVerification({
      mobile: inputData.mobile,
      type: inputData.type,
      verification_code: otp,
      date: currentDate(),
    });
    return res.status(200).json({
      status: 1,
      message: message,
      data: {
        date: currentDate(),
      }
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
});
module.exports = router;
