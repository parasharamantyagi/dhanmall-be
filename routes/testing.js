var express = require("express");
const { MyChildren, updateMyChildren } = require("../models/MyChildrens");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");
const { gameMockData, gameMockData2 } = require("../providers/mockData");
const { gameById } = require("../models/Games");
const {
  getOrderCalculation,
  updateOrderCalculation,
} = require("../models/OrderCalculation");
const { getGameOrderCalculation } = require("../models/GameOrderCalculation");
const { orderByGameId } = require("../models/Orders");
const { setDataType } = require("../helpers");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    check = await getGameOrderCalculation();
    let order = await orderByGameId("651331dbb77d7774016b617c");
    // await updateOrderCalculation("6513123676b15059b25275c3");
    // check = await getOrderCalculationById("6513123676b15059b25275c3");
    // let check = await Author.updateOne({_id: '6509dcbd7742fed0a17dc783'}, { $inc: { money: 50 } });
    return res.status(200).json({ cal: check, order: order });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
