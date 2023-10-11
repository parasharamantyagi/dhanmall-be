const { GDM_CHARGES_FEE, APP_URL, MESSAGE } = require("../config");
const {
  objectFormat,
  arrayOfObject,
  int_toFixed,
  checkObj,
  gameNowTime,
  setDataType,
  currentDate,
  isPositiveNumber,
} = require("../helpers");
const { gameOfDashboard, countOfGame, gameById } = require("../models/Games");
const { saveOrder, orderOfUser, countUserOrders } = require("../models/Orders");
const { userById, minusUserMoney } = require("../models/Users");
const { contract_type } = require("../providers/colors");
const {
  updateGameOrderCalculation,
  getGameOrderCalculationByGameId,
} = require("../models/GameOrderCalculation");

exports.dashboardScreen = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [{ limit: 10 }, { page: 0 }]);
    let countGame = await countOfGame();
    let resultGame = await gameOfDashboard(inputData);
    let result = {
      // color_list: colors1,
      // number_list: colors2,
      game_history: resultGame,
      game_page: countGame,
    };
    return res.status(200).json({ status: 1, data: result });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.gameNow = async (req, res, next) => {
  try {
    let result = await gameById({ game: 0 });
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
    let inputData = objectFormat(req.query);
    let userOrder = await orderOfUser(req.user.user_id, inputData);
    if (checkObj(inputData)) {
      let countOrders = await countUserOrders(req.user.user_id);
      return res.status(200).json({
        status: 1,
        data: {
          order_page: countOrders,
          order_data: userOrder,
        },
      });
    } else {
      return res.status(200).json({ status: 1, data: userOrder });
    }
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.saveOrders = async (req, res, next) => {
  try {
    let inputData = objectFormat(req.body, [
      { user_id: req.user.user_id },
      "contract_type",
      "contract_number",
      "type",
      "pick",
      "game_id",
    ]);
    let gameDetail = await gameById({ game: inputData.game_id,selected: ['date','begintime','period','price'] });
    let user = await userById(inputData.user_id, "money");
    inputData.contract_money = arrayOfObject(contract_type, { id: inputData.contract_type }, "ammount");
    let invest_money = inputData.contract_money * inputData.contract_number;
    if (invest_money > user.money) {
      return res.status(200).json({
        status: 0,
        message: MESSAGE.insufficient_balance,
        data: {},
      });
    }
    let gameTime = currentDate() - gameDetail.begintime;
    if(isPositiveNumber(gameTime) && gameTime > 150){
      return res.status(200).json({
        status: 0,
        message: MESSAGE.TIME_OUT,
        data: {},
      });
    }
    minusUserMoney(inputData.user_id, { money: invest_money });
    inputData.fee = invest_money * GDM_CHARGES_FEE;
    inputData.invest = invest_money - inputData.fee;
    inputData.delivery = checkObj(inputData, "type") && setDataType(inputData.type, "n") === 2 ? inputData.invest * 9 : inputData.invest * 2;
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
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.GameHistory = async (req, res, next) => {
  try {
    let lastGameId = await gameById({ game: 1 });
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
