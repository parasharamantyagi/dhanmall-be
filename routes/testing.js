var express = require("express");
const AWS = require("aws-sdk");
const { plusUserMoney, updateUserFromObject } = require("../models/Users");
const { setDataType } = require("../helpers");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    // updateUserFromObject({ mobile: "+916239463839" }, { money: 1200 });
    // plusUserMoney("6511578c85ec7a8f495384bc", {
    //   money: 20,
    // });
    // check = calCulationNumberPridiction({
    //   pick_red: {
    //     total_amount: 160,
    //     total_delivery: 152,
    //     pick_count: 2,
    //   },
    //   pick_green: {
    //     total_amount: 250,
    //     total_delivery: 237.5,
    //     pick_count: 8,
    //   },
    //   pick_violet: {
    //     total_amount: 10,
    //     total_delivery: 9.5,
    //     pick_count: 1,
    //   },
    //   pick_0: {
    //     total_amount: 60,
    //     total_delivery: 513,
    //     pick_count: 1,
    //   },
    //   pick_1: {
    //     total_amount: 40,
    //     total_delivery: 342,
    //     pick_count: 1,
    //   },
    //   pick_2: {
    //     total_amount: 30,
    //     total_delivery: 256.5,
    //     pick_count: 1,
    //   },
    //   pick_3: {
    //     total_amount: 70,
    //     total_delivery: 598.5,
    //     pick_count: 1,
    //   },
    //   pick_4: {
    //     total_amount: 40,
    //     total_delivery: 342,
    //     pick_count: 1,
    //   },
    //   pick_5: {
    //     total_amount: 60,
    //     total_delivery: 513,
    //     pick_count: 1,
    //   },
    //   pick_6: {
    //     total_amount: 70,
    //     total_delivery: 598.5,
    //     pick_count: 1,
    //   },
    //   pick_7: {
    //     total_amount: 20,
    //     total_delivery: 171,
    //     pick_count: 2,
    //   },
    //   pick_8: {
    //     total_amount: 140,
    //     total_delivery: 1197,
    //     pick_count: 2,
    //   },
    //   pick_9: {
    //     total_amount: 50,
    //     total_delivery: 427.5,
    //     pick_count: 1,
    //   },
    //   total_price: {
    //     total_amount: 1000,
    //     total_delivery: 5358,
    //     pick_count: 23,
    //   },
    //   _id: "651efea7ac8f0c847c46e8d8",
    //   game_id: "651efea7ac8f0c847c46e8d5",
    //   date: 1696530087,
    //   __v: 0,
    // });
    return res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
