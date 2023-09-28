const express = require("express");
const { isUserValid } = require("../validators");
const { rechargeList } = require("../controllers/billing/index.controller");

const router = express.Router();

/* GET home page. */

router.route("/recharge").get(isUserValid, rechargeList);

module.exports = router;
