const { LDM_USER_INTEREST } = require("../config");
const {
  currentDate,
  checkObj,
  merge_object,
  setDataType,
  todayDate,
  str_to_array,
  sum_of_array,
  checkArray,
  find_one,
  lastMonthDate,
  lastDateByDays,
  check,
} = require("../helpers");
const {
  saveGameOrderCalculation,
  getGameOrderCalculationByGameId,
  manageGameBudget,
  removeGameOrderCalculation,
} = require("../models/GameOrderCalculation");
const {
  saveGame,
  gameById,
  updateGame,
  removeGame,
  manageGameAmount,
  findGameContribution,
} = require("../models/Games");
const { orderByGameId, updateOrder, removeOrder } = require("../models/Orders");
const { removeOtpVerification } = require("../models/OtpVerifications");
const { removePayment } = require("../models/Payments");
const {
  removeRecharge,
  rechargeBetweenTwoDate,
  saveRecharge,
  getRechargeDetail,
} = require("../models/Recharges");
const { plusUserMoney } = require("../models/Users");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");
const { saveConfig } = require("../models/Config");

const manageGameInterval = async (gameId) => {
  let all_orders = [];
  let order_cal = { amount: 0 };
  let gameBudgetAmmount = [0];
  let total_winner_pick_count = 0;
  let total_loser_pick_count = 0;
  if (checkObj(gameId)) {
    if (checkObj(gameId, "detail") && check(gameId.detail.set_unit)) {
      saveConfig({ set_game_invest: gameId.invest_price },'set_game_invest');
    }
    all_orders = await orderByGameId(setDataType(gameId._id, "s"));
    let currentGameOrders = await getGameOrderCalculationByGameId({
      type: "current",
      game_id: setDataType(gameId._id, "s"),
    });
    let prevGameOrders = await getGameOrderCalculationByGameId({
      game_not_id: setDataType(gameId._id, "s"),
      selected: ["game_budget"],
    });
    let totalGameContribution = await findGameContribution();
    if (checkArray(prevGameOrders)) {
      let calResult = calCulationNumberPridiction({
        game: gameId,
        gameOrder: currentGameOrders,
        prevGameOrders: totalGameContribution,
        userOrders: all_orders,
      });
      updateGame(setDataType(gameId._id, "s"), calResult);
      for (let order of all_orders) {
        if (order.type === 2) {
          if (order.pick === setDataType(calResult.unit, "s")) {
            order_cal.amount = setDataType(order.delivery, "f");
            order_cal.status = 1;
          } else {
            order_cal.amount = 0;
            order_cal.status = 2;
          }
        } else {
          if (str_to_array(calResult.color).length === 1) {
            if (order.pick === calResult.color) {
              order_cal.amount = setDataType(order.delivery, "f");
              order_cal.status = 1;
            } else {
              order_cal.amount = 0;
              order_cal.status = 2;
            }
          } else {
            if (str_to_array(calResult.color).includes(order.pick)) {
              order_cal.amount =
                order.invest + setDataType(order.invest, "f") / 2;
              order_cal.status = 1;
            } else {
              order_cal.amount = 0;
              order_cal.status = 2;
            }
          }
        }
        if (order_cal.status === 1) {
          total_winner_pick_count++;
        } else {
          total_loser_pick_count++;
        }
        if (checkObj(order.user_id)) {
          plusUserMoney(
            setDataType(order.user_id._id, "s"),
            {
              money: order_cal.amount,
            },
            "win"
          );
          if (checkObj(gameId, "detail") && check(gameId.detail.set_unit)) {
            saveConfig({ set_game_delivery: order_cal.amount },'set_game_delivery');
          }
        }
        gameBudgetAmmount.push(order_cal.amount);
        updateOrder(
          setDataType(order._id, "s"),
          merge_object(
            {
              unit: calResult.unit,
              color: calResult.color,
              price: calResult.price,
            },
            order_cal
          )
        );
      }
      manageGameBudget(setDataType(gameId._id, "s"), {
        total_amount: currentGameOrders.total_price.total_amount,
        total_delivery: sum_of_array(gameBudgetAmmount),
        winner_pick_count: total_winner_pick_count,
        loser_pick_count: total_loser_pick_count,
      });
      manageGameAmount(
        setDataType(gameId._id, "s"),
        { delivery: sum_of_array(gameBudgetAmmount) },
        "delivery"
      );
    }
  }
  let period = setDataType(1, "padStart");
  if (checkObj(gameId)) {
    if (gameId.period && setDataType(gameId.period, "int") < 480) {
      period = setDataType(setDataType(gameId.period, "int") + 1, "padStart");
    } else {
      period = setDataType(1, "padStart");
    }
  }
  let newGame = await saveGame({
    period: period,
    project_id: 1,
    price: 0,
    begintime: currentDate(),
    date: todayDate(),
  });
  saveGameOrderCalculation({
    game_id: setDataType(newGame._id, "s"),
    date: currentDate(),
  });
};

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById({
      game: 0,
      selected: ["_id", "period", "invest_price", "detail"],
    });
    manageGameInterval(gameId);
    return res.status(200).json(true);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.setUserInterest = async (req, res, next) => {
  try {
    let object = true;
    let checkRecharge = await getRechargeDetail({
      type: "interest",
      createdDate: todayDate(0),
    });
    if (!checkObj(checkRecharge)) {
      let rechargeLists = await rechargeBetweenTwoDate(
        lastDateByDays(1, "first"),
        lastDateByDays(1, "last")
      );
      for (let recharge of rechargeLists) {
        if (
          checkObj(recharge) &&
          checkObj(recharge.details, "transaction_id")
        ) {
          let cal_money = LDM_USER_INTEREST * recharge.ammount;
          saveRecharge({
            user_id: recharge.user_id,
            type: "interest",
            ammount: cal_money,
            status: "success",
            date: currentDate(),
            createdDate: todayDate(),
            details: {},
          });
          plusUserMoney(recharge.user_id, { money: cal_money }, "interest");
        }
      }
    }
    return res.status(200).json(object);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};

exports.customSetting = async (req, res, next) => {
  try {
    let object = "okkkkkk";
    await removeGame({ date: { $lt: todayDate() } });
    await removeGameOrderCalculation({ date: { $lt: todayDate() } });
    await removeOtpVerification({ date: { $lt: todayDate() } });

    await removePayment({ date: { $lt: lastMonthDate() } });
    await removeRecharge({ date: { $lt: lastMonthDate() } });
    await removeOrder({ date: { $lt: lastMonthDate() } }); // previews 30 days
    return res.status(200).json(object);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
