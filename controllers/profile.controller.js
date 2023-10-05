const { APP_URL, MESSAGE } = require("../config");
const { objectFormat, merge_object, checkObj } = require("../helpers");
const { getMyChildren, countMyChildren } = require("../models/MyChildrens");
const userModel = require("./../models/Users");
const { userById } = require("../models/Users");
const { dencrypted } = require("../helpers/crypto");
const { encrypted } = require("../helpers/crypto");

exports.myProfile = async (req, res, next) => {
  try {
    let result = await userById(req.user.user_id);
    result = merge_object(result, {
      promotion_url: `${APP_URL}/register?r_code=${result.promotion_code}`,
    });
    return res
      .status(200)
      .json({ status: 1, message: MESSAGE.my_profile, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.myChildren = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query, [
      { user_id: req.user.user_id },
      { type: "lavel_1" },
      { page: 0 },
    ]);
    let result = await userById(req.user.user_id);
    result.total_people = await countMyChildren({ user_id: inputData.user_id });
    result.totalPeopleWithType = await countMyChildren({user_id: inputData.user_id, type: inputData.type});
    result.children = await getMyChildren({user_id: inputData.user_id, type: inputData.type},{ page: inputData.page });
    return res.status(200).json({ status: 1, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      { user_id: req.user.user_id },
      "old_password",
      "new_password",
      "confirm_password",
    ]);
    let user = await userModel.findOne({ _id: inputData.user_id }, [
      "mobile",
      "password",
    ]);
    if (dencrypted(user.password) !== inputData.old_password)
      return res
        .status(200)
        .json({ status: 0, message: "Your old password does't match" });
    if (inputData.new_password !== inputData.confirm_password)
      return res
        .status(200)
        .json({ status: 0, message: "Your confirm password does't match with your new password" });
    userModel.updateUserFromId(inputData.user_id,{password: encrypted(inputData.new_password)});
    return res.status(200).json({ status: 1, message: "Your password has been updated successfully", data: {user_id: inputData.user_id} });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      "nickname",
      "email",
    ]);
    if(checkObj(inputData)){
      userModel.updateUserFromId(req.user.user_id,inputData);
    }
    return res.status(200).json({ status: 1, message: "Your profile has been updated successfully", data: inputData });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
}
