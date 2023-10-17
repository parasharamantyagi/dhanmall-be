const express = require("express");
const { gameInterval, customSetting, setUserInterest } = require("../controllers/cron.job.controller");
const router = express.Router();
/* GET home page. */
router.get("/game-interval",gameInterval);
router.post("/interest",setUserInterest);
router.get("/ok",customSetting);

module.exports = router;
