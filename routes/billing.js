const express = require("express");
const { isUserValid } = require("../validators");
const { rechargeReq, currentGame, withdrawalReq, rechargeStatus, rechargeDetails, withdrawalStatus, setGameUnit } = require("../controllers/billing/index.controller");

const router = express.Router();

/* GET home page. */

router.route("/recharge").get(isUserValid, rechargeReq);
router.route("/withdrawal-req").get(isUserValid, withdrawalReq);
router.route("/recharge-status/:_id").put(isUserValid, rechargeStatus);
router.route("/withdrawal-status/:_id").put(isUserValid, withdrawalStatus);
router.route("/recharge-detail/:_id").get(isUserValid, rechargeDetails);
router.route("/current-game").get(isUserValid, currentGame);
router.route("/set-game").post(isUserValid, setGameUnit);

module.exports = router;
