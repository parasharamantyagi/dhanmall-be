const express = require("express");
const { gameInterval, customSetting, setUserInterest, testingRoute } = require("../controllers/cron.job.controller");
const router = express.Router();
/* GET home page. */
router.get("/game-interval",gameInterval);
router.post("/interest",setUserInterest);
router.get("/ok",customSetting);
router.get("/testing",testingRoute);

module.exports = router;
