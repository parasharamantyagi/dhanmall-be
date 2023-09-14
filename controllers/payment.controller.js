const { MESSAGE, USER_COMMISION } = require("../config");
const { currentDate, checkObj, merge_object } = require("../helpers");
const { setDataType } = require("../helpers");
const { objectFormat } = require("../helpers");
const { saveMyChildren } = require("../models/my_childrens");
const { savePayment } = require("../models/payments");
const { plusUserMoney, getUserForCommision, updateUserFromId } = require("../models/users");

exports.addPayment = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      { user_id: req.user.user_id },
      "ammount",
      { type: "created" },
      {
        date: currentDate(),
      },
    ]);
    plusUserMoney(req.user.user_id, { money: inputData.ammount },'payment');
    savePayment(inputData);
    let userForCommision = await getUserForCommision(inputData.user_id);
    updateUserFromId(req.user.user_id,{first_payment: 1});
    if (
      checkObj(userForCommision, "user_1") &&
      checkObj(userForCommision.user_1)
    ) {
      let ammount = (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_1) / 100;
      saveMyChildren({
        user_id: userForCommision.user_1._id,
        childrens_id: req.user.user_id,
        date: currentDate(),
        first_reward: ammount,
        type: "lavel_1",
      });
      plusUserMoney(userForCommision.user_1._id, { money: ammount },'reward');
      savePayment(merge_object(inputData,{user_id: userForCommision.user_1._id, type: 'reward_1'}));
    }
    if (
      checkObj(userForCommision, "user_2") &&
      checkObj(userForCommision.user_2)
    ) {
      let ammount = (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_2) / 100;
      saveMyChildren({
        user_id: userForCommision.user_2._id,
        childrens_id: req.user.user_id,
        date: currentDate(),
        first_reward: ammount,
        type: "lavel_2",
      });
      plusUserMoney(userForCommision.user_2._id, { money: ammount },'reward');
      savePayment(merge_object(inputData,{user_id: userForCommision.user_2._id, type: 'reward_2'}));
    }
    if (
      checkObj(userForCommision, "user_3") &&
      checkObj(userForCommision.user_3)
    ) {
      let ammount = (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_3) / 100;
      saveMyChildren({
        user_id: userForCommision.user_3._id,
        childrens_id: req.user.user_id,
        date: currentDate(),
        first_reward: ammount,
        type: "lavel_3",
      });
      plusUserMoney(userForCommision.user_1._id, { money: ammount },'reward');
      savePayment(merge_object(inputData,{user_id: userForCommision.user_1._id, type: 'reward_3'}));
    }
    return res.status(200).json({
      status: 1,
      message: MESSAGE.PAYMENT_SUCCESS,
      data: userForCommision,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
