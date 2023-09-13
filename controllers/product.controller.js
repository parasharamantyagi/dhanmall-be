const { GDM_CHARGES_FEE } = require("../config");
const {
  objectFormat,
  arrayOfObject,
  int_toFixed,
  checkObj,
  merge_object,
  array_to_str,
} = require("../helpers");
const { gameOfDashboard, countOfGame, gameById } = require("../models/games");
const { saveOrderCalculation } = require("../models/orderCalculation");
const { saveOrder, orderOfUser } = require("../models/orders");
const { userById } = require("../models/users");
const { colors1, colors2, contract_type } = require("../providers/colors");

exports.myProfile = async (req, res, next) => {
  try {
    let result = await userById(req.user.user_id);
    return res.status(200).json({ status: 1, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.dashboardScreen = async (req, res, next) => {
  try {
    let inputData = req.body;
    let countGame = await countOfGame();
    let resultGame = await gameOfDashboard(inputData);
    let result = {
      // color_list: colors1,
      // number_list: colors2,
      game_history: resultGame,
      game_page: Math.ceil(countGame / 10),
    };
    return res.status(200).json({ status: 1, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.gameNow = async (req, res, next) => {
  try {
    let result = await gameById();
    return res.status(200).json({ status: 1, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    let userOrder = await orderOfUser(req.user.user_id);
    return res.status(200).json({ status: 1, data: userOrder });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.saveOrders = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      "contract_type",
      "contract_number",
      "type",
      "pick",
      "game_id",
    ]);
    let gameDetail = await gameById(inputData.game_id);
    inputData.user_id = req.user.user_id;
    inputData.contract_money = arrayOfObject(
      contract_type,
      { id: inputData.contract_type },
      "ammount"
    );
    let invest_money = inputData.contract_money * inputData.contract_number;
    invest_money =
      checkObj(inputData, "type") && inputData.type === "2"
        ? invest_money * 9
        : invest_money;
    inputData.fee = invest_money * GDM_CHARGES_FEE;
    inputData.delivery = invest_money - inputData.fee;
    inputData.project_id = 1;
    inputData.goods_id = 11;
    inputData.price = gameDetail.price;
    inputData.fee = int_toFixed(inputData.fee);
    let order = await saveOrder(inputData);
    saveOrderCalculation(
      merge_object({ order_id: array_to_str(order._id) }, inputData)
    );
    return res.status(200).json({ status: 1, data: order });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
