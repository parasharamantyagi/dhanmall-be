const express = require("express");
const { isAdminValid } = require("../validators");
const { rechargeReq, currentGame, withdrawalReq, rechargeStatus, rechargeDetails, withdrawalStatus, setGameUnit, getAllUsers } = require("../controllers/billing/index.controller");
const { allOrders, allGames, gamesContribution, userChildren, userRecharge, userGames } = require("../controllers/billing/users.controller");

const router = express.Router();

/* GET home page. */

router.route("/recharge").get(isAdminValid, rechargeReq);
router.route("/withdrawal-req").get(isAdminValid, withdrawalReq);
router.route("/recharge-status/:_id").put(isAdminValid, rechargeStatus);
router.route("/withdrawal-status/:_id").put(isAdminValid, withdrawalStatus);
router.route("/recharge-detail/:_id").get(isAdminValid, rechargeDetails);
router.route("/current-game").get(isAdminValid, currentGame);
router.route("/set-game").post(isAdminValid, setGameUnit);
router.route("/users").post(isAdminValid, getAllUsers);

router.route("/games-contribution").get(isAdminValid, gamesContribution);
router.route("/user-games").get(isAdminValid, userGames);
router.route("/user-payments").post(isAdminValid, userRecharge);
router.route("/games").get(isAdminValid, allGames);
router.route("/orders").post(isAdminValid, allOrders);

router.route("/user-child/:user_id").get(isAdminValid, userChildren);
module.exports = router;
