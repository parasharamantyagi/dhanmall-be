const { MESSAGE } = require("../config");
const { checkObj, objectFormat, check } = require("../helpers");
const { encrypted, dencrypted, setJWT, promotionCode } = require("../helpers/crypto");
const { checkOtpVerification } = require("../models/OtpVerifications");
const userModel = require("./../models/Users");

exports.indexWelcome = async (req, res, next) => {
  try {
    // const user = new userModel({ name: 'aman tyagi', age: 30 });
    // await user.save();
    // let response = { message: 'Welcome this is first app' };
    // const users = await userModel.find({});

    return res.status(200).json("Welcome");
  } catch (e) {
    return res.json();
  }
};

exports.registerReq = async (req, res, next) => {
  try {
    const inputData = objectFormat(req.body, ['nickname', 'mobile', 'password', 'verification_code', 'recommendation_code']);
    let user = await userModel.findOne({ mobile: inputData.mobile }, ["mobile"]);
    if (checkObj(user))
      return res
        .status(200)
        .send({ status: 0,type: 'mobile', message: MESSAGE.MOBILE_IS_USE });
    let otpCheck = await checkOtpVerification({mobile: inputData.mobile, type: 'registration'}, inputData.verification_code);
    if(!check(otpCheck)){
      return res
        .status(200)
        .send({ status: 0,type: 'verification_code', message: MESSAGE.INVALID_OTP });
    }
    inputData.password = encrypted(inputData.password);
    inputData.promotion_code = promotionCode();
    const saveuser = new userModel(inputData);
    let user_result = await saveuser.save();
    userModel.manageUserAllChildren(user_result);
    return res.status(200).json({
      status: 1,
      message: "User register successfully",
      token: setJWT({
        user_id: user_result._id,
      }),
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.loginReq = async (req, res, next) => {
  try {
    const inputData = objectFormat(req.body, ["mobile", "password"]);
    let user = await userModel.findOne({ mobile: inputData.mobile }, [
      "mobile",
      "password",
    ]);
    if (!checkObj(user))
      return res
        .status(200)
        .send({ status: 0, message: "This is invalid mobile" });
    if (dencrypted(user.password) === inputData.password) {
      return res.status(200).json({
        status: 1,
        message: "User login successfully",
        token: setJWT({
          user_id: user._id,
        }),
      });
    } else {
      return res
        .status(200)
        .json({ status: 1, message: "Password not matched!" });
    }
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
