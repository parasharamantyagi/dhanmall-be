const { MESSAGE } = require("../../config");
const {
  objectFormat,
  checkObj,
  check,
  merge_object,
  setDataType,
} = require("../../helpers");
const { getOneBankCardModule } = require("../../models/BankCards");
const {
  getGameOrderCalculationByGameId,
} = require("../../models/GameOrderCalculation");
const { updateGame } = require("../../models/Games");
const {
  billingRecharge,
  countRecharge,
  updatedRechargeModule,
  getRechargeDetail,
} = require("../../models/Recharges");
const { billingUsers, countUsers } = require("../../models/Users");
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
      await updatedRechargeModule(rechargeId, inputData);
      handlePaymentRequest({
        user_id: setDataType(rechargeDetail.user_id._id, "s"),
        ammount: setDataType(rechargeDetail.ammount, "f"),
        type: "created",
        date: rechargeDetail.date,
      });
    }else if(inputData.status === "failure"){
      await updatedRechargeModule(rechargeId, inputData);
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
    let current_game = await getGameOrderCalculationByGameId({ type: 'current' });
    let game_record = [];
    if(checkObj(current_game) && checkObj(current_game.game_id)){
      game_record = await getGameOrderCalculationByGameId({current_game: setDataType(current_game.game_id._id,'s'), selected: ['game_budget']});
    }
    return res.status(200).json({
      status: 1,
      message: "Current list",
      data: {current_game: current_game, game_record : game_record},
    });
  } catch (e) {
    return res.json();
  }
};

exports.setGameUnit = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      "game_id",
      "set_value",
      "set_unit",
    ]);
    if (setDataType(inputData.set_unit, "n")) {
      updateGame(inputData.game_id, {
        detail: {
          set_unit: setDataType(inputData.set_unit, "n"),
          set_value: setDataType(inputData.set_value, "n"),
        },
      });
    } else {
      updateGame(inputData.game_id, { detail: { set_unit: 0, set_value: 0 } });
    }
    return res.status(200).json({
      status: 1,
      message: "Set game list",
      data: inputData,
    });
  } catch (e) {
    return res.json();
  }
};


exports.getAllUsers = async (req, res, next) => {
  try {
    let { page } = objectFormat(req.query, [{ page: 0 }]);
    let inputData = objectFormat(req.body,['mobile','promotion_code']);
    if(checkObj(inputData,'mobile')){
      inputData.mobile = inputData.mobile.trim();
    }
    if(checkObj(inputData,'promotion_code')){
      inputData.mobile = inputData.mobile.trim();
    }
    let count = await countUsers(inputData);
    let userList = await billingUsers(inputData, setDataType(page, "n"));
    return res.status(200).json({
      status: 1,
      message: "User list",
      data: {
        count: count,
        result: userList,
      },
    });
  } catch (e) {
    return res.json();
  }
};