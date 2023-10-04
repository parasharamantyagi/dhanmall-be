const express = require("express");
const { isUserValid } = require("../validators");
const { rechargeReq, currentGame, withdrawalReq, rechargeStatus } = require("../controllers/billing/index.controller");

const router = express.Router();

/* GET home page. */

router.route("/recharge").get(isUserValid, rechargeReq);
router.route("/withdrawal-req").get(isUserValid, withdrawalReq);
router.route("/recharge-status/:_id").put(isUserValid, rechargeStatus);
router.route("/current-game").get(isUserValid, currentGame);

module.exports = router;
