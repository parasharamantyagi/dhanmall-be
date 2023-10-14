var express = require("express");
const AWS = require("aws-sdk");
const { plusUserMoney, updateUserFromObject } = require("../models/Users");
const { setDataType, sum_of_array, getSmallerAmount } = require("../helpers");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");
const { manageGameBudget, getGameOrderCalculationByGameId } = require("../models/GameOrderCalculation");
const { gameById } = require("../models/Games");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    let gameId = await gameById({ game: 0 , selected: ['_id','period','detail']});
    check = await getGameOrderCalculationByGameId();
    check = calCulationNumberPridiction(check,gameId);
    return res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
