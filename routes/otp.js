const express = require("express");
const { objectFormat } = require("../helpers");
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  GDM_MODULE,
} = require("../config");
const { saveOtpVerification } = require("../models/OtpVerifications");
const { currentDate } = require("../helpers");
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const router = express.Router();

/* GET home page. */
router.post("/", async (req, res, next) => {
  try {
    const inputData = objectFormat(req.body, ["mobile"]);
    let otp = GDM_MODULE.rn({ min: 1111, max: 9999, integer: true });
    client.messages
      .create({
        body: `Your one time otp is ${otp}`,
        from: "+12566701744",
        to: `+917347332511`,
      })
      .then((message) => {
        console.log("success");
        console.log(message);
      })
      .catch((err) => {
        console.log("eerrr", err);
      });
    saveOtpVerification({
      mobile: inputData.mobile,
      verification_code: otp,
      date: currentDate(),
    });
    return res.status(200).json(inputData);

    // {
    //   status: 1,
    //   message: "User register successfully",
    //   token: setJWT({
    //     user_id: user_result._id,
    //   }),
    // }
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
});
module.exports = router;
