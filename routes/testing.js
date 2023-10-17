const express = require("express");
const { getGameOrderCalculationByGameId } = require("../models/GameOrderCalculation");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    check = await getGameOrderCalculationByGameId({type: 'current'});
    return res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;