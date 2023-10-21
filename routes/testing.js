const express = require("express");
const { getGameOrderCalculationByGameId } = require("../models/GameOrderCalculation");
const { removeOrder, orderOfUser, orderByGameId } = require("../models/Orders");
const { gameById } = require("../models/Games");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");
const { setDataType } = require("../helpers");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    // let gameId = await gameById({ game: 0 , selected: ['_id','period','detail']});
    // let all_orders = await orderByGameId(setDataType(gameId._id, "s"));
    // ({type: 'current', game_id: setDataType(gameId._id, "s")});
    // let currentGameOrders = await getGameOrderCalculationByGameId({type: 'current', game_id: setDataType(gameId._id, "s")});
    // let prevGameOrders = await getGameOrderCalculationByGameId({game_not_id: setDataType(gameId._id, "s"), selected: ["total_price", "game_budget"]});
    // let calResult = calCulationNumberPridiction({
    //   game: gameId,
    //   gameOrder: currentGameOrders,
    //   prevGameOrders: prevGameOrders,
    //   userOrders: all_orders
    // });
    return res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;