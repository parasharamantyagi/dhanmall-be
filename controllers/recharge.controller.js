const { MESSAGE } = require("../config");
const { objectFormat, currentDate, check, checkObj } = require("../helpers");
const {
  saveBankCardModule,
  getBankCardModule,
  getOneBankCardModule,
  getBankCardDetailModule,
} = require("../models/BankCards");
const {
  saveRecharge,
  getRechargeModule,
  countRecharge,
} = require("../models/Recharges");

exports.getRecharge = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query);
    let countResult = await countRecharge({ user_id: req.user.user_id });
    let result = await getRechargeModule(
      { user_id: req.user.user_id },
      inputData
    );
    return res.status(200).json({
      status: 1,
      message: MESSAGE.GET_RECHARGE,
      data: {
        count: countResult,
        result: result,
      },
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
        type: "upipay",
      },
    ]);
    saveRecharge({
      user_id: inputData.user_id,
      type: "recharge",
      ammount: inputData.ammount,
      status: "processing",
      date: currentDate(),
      details: {
        type: inputData.type,
        transaction_id: inputData.transaction_id,
        remarks: inputData.remarks,
      },
    });
    return res.status(200).json({
      status: 1,
      message: MESSAGE.ADD_RECHARGE,
      data: inputData,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.getBankCardById = async (req, res, next) => {
  try {
    let bankId = req.params._id;
    let getBankDetail = await getBankCardDetailModule({
      _id: bankId,
    });
    return res.status(200).json({
      status: 1,
      message: MESSAGE.GET_BANK_CARD_ID,
      data: getBankDetail,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.getWithdrawRequest = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query);
    let countResult = await countRecharge({
      user_id: req.user.user_id,
      type: "withdraw",
    });
    let result = await getRechargeModule(
      { user_id: req.user.user_id, type: "withdraw" },
      inputData
    );
    return res.status(200).json({
      status: 1,
      message: MESSAGE.GET_WITHDRAW_REQUEST,
      data: {
        count: countResult,
        result: result,
      },
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.addWithdrawRequest = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      { user_id: req.user.user_id },
      "ammount",
      "bank_card",
    ]);
    saveRecharge({
      user_id: inputData.user_id,
      type: "withdraw",
      ammount: inputData.ammount,
      status: "processing",
      date: currentDate(),
      details: {
        bank_card: inputData.bank_card,
      },
    });
    return res.status(200).json({
      status: 1,
      message: MESSAGE.ADD_WITHDRAW_REQUEST,
      data: inputData,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.getBankCard = async (req, res, next) => {
  try {
    let result = await getBankCardModule(req.user.user_id);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.GET_BANK_CARD,
      data: result,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.addBankCard = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      { user_id: req.user.user_id },
      "actual_name",
      "ifsc_code",
      "bank_name",
      "bank_account",
      "state",
      "city",
      "address",
      "email",
      { date: currentDate() },
    ]);
    let checkBankDetail = await getOneBankCardModule({
      bank_account: inputData.bank_account,
    });
    if (checkObj(checkBankDetail)) {
      return res.status(200).json({
        status: 0,
        message: MESSAGE.BANK_CARD_EXIT,
      });
    }
    saveBankCardModule(inputData);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.ADD_RECHARGE,
      data: {},
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
