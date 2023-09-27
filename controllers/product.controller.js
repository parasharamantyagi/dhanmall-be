const { GDM_CHARGES_FEE, APP_URL, MESSAGE } = require("../config");
const {
  objectFormat,
  arrayOfObject,
  int_toFixed,
  checkObj,
  merge_object,
  gameNowTime,
  setDataType,
} = require("../helpers");
const { gameOfDashboard, countOfGame, gameById } = require("../models/Games");
const { getMyChildren } = require("../models/MyChildrens");
const { saveOrder, orderOfUser } = require("../models/Orders");
const { userById, minusUserMoney } = require("../models/Users");
const { colors1, colors2, contract_type } = require("../providers/colors");
const {
  updateGameOrderCalculation,
  getGameOrderCalculationByGameId,
} = require("../models/GameOrderCalculation");

exports.myProfile = async (req, res, next) => {
  try {
    let result = await userById(req.user.user_id);
    result = merge_object(result, {
      promotion_url: `${APP_URL}/register?r_code=${result.promotion_code}`,
    });
    return res
      .status(200)
      .json({ status: 1, message: MESSAGE.my_profile, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.myChildren = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.query, [
      { user_id: req.user.user_id },
      { type: "lavel_1" },
    ]);
    let result = await userById(req.user.user_id);
    result.children = await getMyChildren(inputData);
    return res.status(200).json({ status: 1, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.dashboardScreen = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [{ limit: 10 }, { page: 0 }]);
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
    let result = await gameById(0);
    result.ammount = await userById(req.user.user_id, "money").then((res) => {
      return res.money;
    });
    result.time = gameNowTime();
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
    let user = await userById(inputData.user_id, "money");
    inputData.contract_money = arrayOfObject(
      contract_type,
      { id: inputData.contract_type },
      "ammount"
    );
    let invest_money = inputData.contract_money * inputData.contract_number;
    if (invest_money > user.money) {
      return res.status(200).json({
        status: 0,
        message: MESSAGE.insufficient_balance,
        data: {},
      });
    } else {
      minusUserMoney(inputData.user_id, { money: invest_money });
      invest_money =
        checkObj(inputData, "type") && setDataType(inputData.type, "n") === 2
          ? invest_money * 9
          : invest_money;
      // inputData.invest_money = invest_money;
      inputData.fee = invest_money * GDM_CHARGES_FEE;
      inputData.delivery = invest_money - inputData.fee;
      inputData.project_id = 1;
      inputData.goods_id = 11;
      inputData.price = gameDetail.price;
      inputData.details = {
        game_period: gameDetail.period,
        game_date: gameDetail.date,
      };
      inputData.fee = int_toFixed(inputData.fee);
      let order = await saveOrder(inputData);
      updateGameOrderCalculation(inputData.game_id, inputData);
      return res
        .status(200)
        .json({ status: 1, message: MESSAGE.SAVE_ORDER, data: inputData });
    }
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.GameHistory = async (req, res, next) => {
  try {
    let lastGameId = await gameById(1);
    let all_orders = await getGameOrderCalculationByGameId(
      setDataType(lastGameId._id, "s")
    );
    return res.status(200).json({
      status: 1,
      message: "Previews game history",
      data: all_orders,
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
