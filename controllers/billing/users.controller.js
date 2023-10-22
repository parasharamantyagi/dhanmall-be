const { MESSAGE } = require("../../config");
const {
  objectFormat,
} = require("../../helpers");
const { findAllGame, findGameContribution } = require("../../models/Games");
const { getMyChildren } = require("../../models/MyChildrens");
const { billingOrders } = require("../../models/Orders");

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
    let inputQuery = objectFormat(req.query, [{ page: 0 }]);
    let inputBody = objectFormat(req.parms,['user_id']);
    return res.status(200).json({
      status: 1,
      message: MESSAGE.BILLING_ORDERS_LIST,
      data: await getMyChildren(inputBody,inputQuery),
    });
  } catch (e) {
    return res.json();
  }
};