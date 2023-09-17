const { MESSAGE, USER_COMMISION } = require("../config");
const {
  currentDate,
  checkObj,
  merge_object,
  arrayOfObject,
} = require("../helpers");
const { setDataType } = require("../helpers");
const { objectFormat } = require("../helpers");
const {
  saveMyChildren,
  getMyChildren,
  updateMyChildren,
} = require("../models/my_childrens");
const { savePayment } = require("../models/payments");
const {
  plusUserMoney,
  getUserForCommision,
  updateUserFromId,
} = require("../models/users");

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
    plusUserMoney(req.user.user_id, { money: inputData.ammount }, "payment");
    savePayment(inputData);
    updateUserFromId(req.user.user_id, { first_payment: 1 });
    let dicountAdmin = await getMyChildren({ childrens_id: req.user.user_id });

    let resLavel1 = arrayOfObject(dicountAdmin, { type: "lavel_1" });
    let resLavel2 = arrayOfObject(dicountAdmin, { type: "lavel_2" });
    let resLavel3 = arrayOfObject(dicountAdmin, { type: "lavel_3" });
    let resLavel4 = arrayOfObject(dicountAdmin, { type: "lavel_4" });
    if (checkObj(resLavel1)) {
      let ammount =
        (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_1) / 100;
      updateMyChildren(resLavel1._id, { first_reward: ammount });
      plusUserMoney(resLavel1.user_id, { money: ammount }, "reward");
      savePayment(
        merge_object(inputData, {
          user_id: resLavel1.user_id,
          type: "reward_1",
        })
      );
    }
    if (checkObj(resLavel2)) {
      let ammount =
        (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_2) / 100;
      updateMyChildren(resLavel2._id, { first_reward: ammount });
      plusUserMoney(resLavel2.user_id, { money: ammount }, "reward");
      savePayment(
        merge_object(inputData, {
          user_id: resLavel2.user_id,
          type: "reward_1",
        })
      );
    }
    if (checkObj(resLavel3)) {
      let ammount =
        (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_3) / 100;
      updateMyChildren(resLavel3._id, { first_reward: ammount });
      plusUserMoney(resLavel3.user_id, { money: ammount }, "reward");
      savePayment(
        merge_object(inputData, {
          user_id: resLavel3.user_id,
          type: "reward_1",
        })
      );
    }
    if (checkObj(resLavel4)) {
      let ammount =
        (setDataType(inputData.ammount) * USER_COMMISION.LAVEL_4) / 100;
      updateMyChildren(resLavel4._id, { first_reward: ammount });
      plusUserMoney(resLavel4.user_id, { money: ammount }, "reward");
      savePayment(
        merge_object(inputData, {
          user_id: resLavel4.user_id,
          type: "reward_1",
        })
      );
    }
    return res.status(200).json({
      status: 1,
      message: MESSAGE.PAYMENT_SUCCESS,
      data: {},
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
