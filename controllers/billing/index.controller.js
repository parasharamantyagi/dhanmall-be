const { objectFormat } = require("../../helpers");
const {
  currentGameOrderCalculation,
} = require("../../models/GameOrderCalculation");
const { billingRecharge, countRecharge } = require("../../models/Recharges");

exports.rechargeList = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query, [{ limit: 10 }, { page: 0 }]);
    let countResult = await countRecharge();
    let respone = await billingRecharge(inputData);
    return res.status(200).json({
      status: 1,
      message: "Recharge list",
      data: {
        recharge_page: Math.ceil(countResult / 10),
        recharge: respone,
      },
    });
  } catch (e) {
    return res.json();
  }
};

exports.currentGame = async (req, res, next) => {
  try {
    let respone = await currentGameOrderCalculation();
    return res.status(200).json({
      status: 1,
      message: "Current list",
      data: respone,
    });
  } catch (e) {
    return res.json();
  }
};
