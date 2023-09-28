const express = require("express");
const { isUserValid } = require("../validators");
const { rechargeList, currentGame } = require("../controllers/billing/index.controller");

const router = express.Router();

/* GET home page. */

router.route("/recharge").get(isUserValid, rechargeList);
router.route("/current-game").get(isUserValid, currentGame);

module.exports = router;
