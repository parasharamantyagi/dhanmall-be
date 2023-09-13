const { checkObj, objectFormat } = require("../helpers");
const { encrypted, dencrypted, setJWT, promotionCode } = require("../helpers/crypto");
const userModel = require("./../models/users");

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
    const inputData = objectFormat(req.body, ['email', 'password', 'verification_code', 'recommendation_code']);
    let user = await userModel.findOne({ email: inputData.email }, ["email"]);
    if (checkObj(user))
      return res
        .status(400)
        .send({ status: 0, message: "This email is already use" });
    inputData.password = encrypted(inputData.password);
    inputData.promotion_code = promotionCode();
    const saveuser = new userModel(inputData);
    let user_result = await saveuser.save();
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
    const inputData = objectFormat(req.body, ["email", "password"]);
    let user = await userModel.findOne({ email: inputData.email }, [
      "email",
      "password",
    ]);
    if (!checkObj(user))
      return res
        .status(400)
        .send({ status: 0, message: "This is invalid email" });
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
