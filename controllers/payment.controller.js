const { MESSAGE, USER_FIRST_COMMISION, USER_NORMAL_COMMISION } = require("../config");
const {
  currentDate,
  checkObj,
  merge_object,
  arrayOfObject,
  check,
} = require("../helpers");
const { setDataType } = require("../helpers");
const { objectFormat } = require("../helpers");
const { getMyChildren, updateMyChildren } = require("../models/MyChildrens");
const { savePayment } = require("../models/Payments");
const {
  plusUserMoney,
  updateUserFromId,
  userById,
} = require("../models/Users");

exports.handlePaymentRequest = async (inputData) => {
  plusUserMoney(inputData.user_id, { money: setDataType(inputData.ammount,'n') }, "payment");
  savePayment(inputData);
  updateUserFromId(inputData.user_id, { first_payment: 1 });
  let getUser = await userById(inputData.user_id, "first_payment");
  let dicountAdmin = await getMyChildren({ childrens_id: inputData.user_id });
  let resLavel1 = arrayOfObject(dicountAdmin, { type: "lavel_1" });
  let resLavel2 = arrayOfObject(dicountAdmin, { type: "lavel_2" });
  let resLavel3 = arrayOfObject(dicountAdmin, { type: "lavel_3" });
  let resLavel4 = arrayOfObject(dicountAdmin, { type: "lavel_4" });
  let resLavel5 = arrayOfObject(dicountAdmin, { type: "lavel_5" });
  if (checkObj(resLavel1)) {
    let ammount_commission = check(getUser.first_payment) ? USER_NORMAL_COMMISION.LAVEL_1 : USER_FIRST_COMMISION.LAVEL_1;
    let ammount = (setDataType(inputData.ammount,'n') * ammount_commission) / 100;
    let myChildrenUpdated = check(getUser.first_payment) ? { water_reward: ammount } : { first_reward: ammount };
    updateMyChildren(resLavel1._id, myChildrenUpdated);
    plusUserMoney(resLavel1.user_id, { money: ammount }, "reward");
    savePayment(
      merge_object(inputData, {
        user_id: resLavel1.user_id,
        type: "reward_1",
      })
    );
  }
  if (checkObj(resLavel2)) {
    let ammount_commission = check(getUser.first_payment) ?  USER_NORMAL_COMMISION.LAVEL_2 : USER_FIRST_COMMISION.LAVEL_2;
    let ammount = (setDataType(inputData.ammount,'n') * ammount_commission) / 100;
    let myChildrenUpdated = check(getUser.first_payment) ? { water_reward: ammount } : { first_reward: ammount };
    updateMyChildren(resLavel2._id, myChildrenUpdated);
    plusUserMoney(resLavel2.user_id, { money: ammount }, "reward");
    savePayment(
      merge_object(inputData, {
        user_id: resLavel2.user_id,
        type: "reward_1",
      })
    );
  }
  if (checkObj(resLavel3)) {
    let ammount_commission = check(getUser.first_payment) ? USER_NORMAL_COMMISION.LAVEL_3 : USER_FIRST_COMMISION.LAVEL_3;
    let ammount = (setDataType(inputData.ammount,'n') * ammount_commission) / 100;
    let myChildrenUpdated = check(getUser.first_payment) ? { water_reward: ammount } : { first_reward: ammount };
    updateMyChildren(resLavel3._id, myChildrenUpdated);
    plusUserMoney(resLavel3.user_id, { money: ammount }, "reward");
    savePayment(
      merge_object(inputData, {
        user_id: resLavel3.user_id,
        type: "reward_1",
      })
    );
  }
  if (checkObj(resLavel4)) {
    let ammount_commission = check(getUser.first_payment) ? USER_NORMAL_COMMISION.LAVEL_4 : USER_FIRST_COMMISION.LAVEL_4;
    let ammount = (setDataType(inputData.ammount,'n') * ammount_commission) / 100;
    let myChildrenUpdated = check(getUser.first_payment) ? { water_reward: ammount } : { first_reward: ammount };
    updateMyChildren(resLavel4._id, myChildrenUpdated);
    plusUserMoney(resLavel4.user_id, { money: ammount }, "reward");
    savePayment(
      merge_object(inputData, {
        user_id: resLavel4.user_id,
        type: "reward_1",
      })
    );
  }
  if (checkObj(resLavel5)) {
    let ammount_commission = check(getUser.first_payment) ?  USER_NORMAL_COMMISION.LAVEL_5 : USER_FIRST_COMMISION.LAVEL_5;
    let ammount = (setDataType(inputData.ammount,'n') * ammount_commission) / 100;
    let myChildrenUpdated = check(getUser.first_payment) ? { water_reward: ammount } : { first_reward: ammount };
    updateMyChildren(resLavel5._id, myChildrenUpdated);
    plusUserMoney(resLavel5.user_id, { money: ammount }, "reward");
    savePayment(
      merge_object(inputData, {
        user_id: resLavel5.user_id,
        type: "reward_1",
      })
    );
  }
  return true;
};

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
    this.handlePaymentRequest(inputData);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.PAYMENT_SUCCESS,
      data: {},
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
