const { MESSAGE } = require("../config");
const { objectFormat, currentDate, check, checkObj } = require("../helpers");
const {
  saveBankCardModule,
  getBankCardModule,
  getOneBankCardModule,
  getBankCardDetailModule,
} = require("../models/BankCards");
const { checkOtpVerification } = require("../models/OtpVerifications");
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
    let otpCheck = await checkOtpVerification(
      { mobile: inputData.mobile_number, type: "bankcard" },
      req.body.verification_code
    );
    if (!check(otpCheck)) {
      return res.status(200).send({ status: 0, message: MESSAGE.INVALID_OTP });
    }
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
