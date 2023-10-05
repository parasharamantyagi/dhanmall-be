const { MESSAGE } = require("../../config");
const {
  objectFormat,
  checkObj,
  check,
  merge_object,
} = require("../../helpers");
const { getOneBankCardModule } = require("../../models/BankCards");
const {
  currentGameOrderCalculation,
  getGameOrderCalculationByGameId,
} = require("../../models/GameOrderCalculation");
const {
  billingRecharge,
  countRecharge,
  updatedRechargeModule,
  getRechargeDetail,
} = require("../../models/Recharges");
const { handlePaymentRequest } = require("../payment.controller");

exports.rechargeReq = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query, [{ page: 0 }]);
    let countResult = await countRecharge({ type: "recharge" });
    let result = await billingRecharge(
      merge_object(inputData, { type: "recharge" })
    );
    return res.status(200).json({
      status: 1,
      message: "Recharge list",
      data: {
        count: countResult,
        result: result,
      },
    });
  } catch (e) {
    return res.json();
  }
};

exports.withdrawalReq = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query, [{ page: 0 }]);
    let countResult = await countRecharge({ type: "withdraw" });
    let result = await billingRecharge(
      merge_object(inputData, { type: "withdraw" })
    );
    return res.status(200).json({
      status: 1,
      message: "Recharge list",
      data: {
        count: countResult,
        result: result,
      },
    });
  } catch (e) {
    return res.json();
  }
};

exports.rechargeStatus = async (req, res, next) => {
  try {
    let rechargeId = req.params._id;
    let inputData = objectFormat(req.body, ["status"]);
    if (inputData.status === "success") {
      let rechargeDetail = await getRechargeDetail({ _id: rechargeId });
      updatedRechargeModule(rechargeId, inputData);
      handlePaymentRequest({
        user_id: rechargeDetail.user_id._id,
        ammount: rechargeDetail.ammount,
        type: "created",
        date: rechargeDetail.date,
      });
    }
    return res.status(200).json({
      status: 1,
      message: MESSAGE.STATUS_UPDATE_SUCCESSFULLY,
      data: {},
    });
  } catch (e) {
    return res.json();
  }
};

exports.withdrawalStatus = async (req, res, next) => {
  try {
    let rechargeId = req.params._id;
    let inputData = objectFormat(req.body, ["status"]);
    updatedRechargeModule(rechargeId, inputData);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.STATUS_UPDATE_SUCCESSFULLY,
      data: {},
    });
  } catch (e) {
    return res.json();
  }
};

exports.rechargeDetails = async (req, res, next) => {
  try {
    let rechargeId = req.params._id;
    let result = await getRechargeDetail({ _id: rechargeId });
    if (result.type === "withdraw" && checkObj(result.details, "bank_card")) {
      result.bank_details = await getOneBankCardModule({
        _id: result.details.bank_card,
      });
    }
    return res.status(200).json({
      status: 1,
      message: "Details",
      data: result,
    });
  } catch (e) {
    return res.json();
  }
};

exports.currentGame = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query, [{ game_id: "" }]);
    let respone = "";
    if (checkObj(inputData, "game_id") && check(inputData.game_id)) {
      respone = await getGameOrderCalculationByGameId(inputData.game_id);
    } else {
      respone = await currentGameOrderCalculation();
    }
    return res.status(200).json({
      status: 1,
      message: "Current list",
      data: respone,
    });
  } catch (e) {
    return res.json();
  }
};
