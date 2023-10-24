const { MESSAGE } = require("../../config");
const {
  objectFormat,
} = require("../../helpers");
const { findAllGame, findGameContribution } = require("../../models/Games");
const { getMyChildren, countMyChildren } = require("../../models/MyChildrens");
const { billingOrders } = require("../../models/Orders");
const { getRechargeModule } = require("../../models/Recharges");

exports.gamesContribution = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 1,
      message: 'success',
      data: await findGameContribution(),
    });
  } catch (e) {
    return res.json();
  }
}

exports.allGames = async (req, res, next) => {
  try {
    let inputQuery = objectFormat(req.query, [{ page: 0 }]);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.BILLING_ORDERS_LIST,
      data: await findAllGame(inputQuery),
    });
  } catch (e) {
    return res.json();
  }
};

exports.userRecharge = async (req, res, next) => {
  try {
    let inputQuery = objectFormat(req.query, [{ page: 0 }]);
    let inputBody = objectFormat(req.body,['user_id','type']);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.USER_PAYMENT_HISTORY,
      data: await getRechargeModule(inputBody,inputQuery),
    });
  } catch (e) {
    return res.json();
  }
};

exports.allOrders = async (req, res, next) => {
  try {
    let inputQuery = objectFormat(req.query, [{ page: 0 }]);
    let inputBody = objectFormat(req.body,['game_id','user_id']);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.BILLING_ORDERS_LIST,
      data: await billingOrders(inputBody,inputQuery),
    });
  } catch (e) {
    return res.json();
  }
};

exports.userChildren = async (req, res, next) => {
  try {
    let bankId = req.params.user_id;
    let inputQuery = objectFormat(req.query, [{ page: 0 }]);
    let inputBody = objectFormat(req.params,['user_id']);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.BILLING_ORDERS_LIST,
      data: {
        count : await countMyChildren(inputBody),
        result: await getMyChildren(inputBody,inputQuery),
      }
    });
  } catch (e) {
    return res.json();
  }
};