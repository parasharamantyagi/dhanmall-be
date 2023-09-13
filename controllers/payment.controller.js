const { currentDate } = require("../helpers");
const { objectFormat } = require("../helpers");
const { savePayment } = require("../models/payments");
const { setUserMoney } = require("../models/users");

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
    setUserMoney(req.user.user_id, { money: inputData.ammount });
    savePayment(inputData);
    return res.status(200).json({
      status: 1,
      message: "Payment created successfully",
      data: inputData,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
