const { MESSAGE } = require("../config");
const { objectFormat, currentDate } = require("../helpers");
const { saveRecharge, getRecharge } = require("../models/Recharges");

exports.getRecharge = async (req, res, next) => {
  try {
    let result = await getRecharge(req.user.user_id);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.GET_RECHARGE,
      data: result,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.addRecharge = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      { user_id: req.user.user_id },
      "ammount",
      "transaction_id",
      "remarks",
      {
        type: "type_1",
      },
      {
        status: "processing",
      },
      {
        date: currentDate(),
      },
    ]);
    saveRecharge(inputData);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.ADD_RECHARGE,
      data: inputData,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
