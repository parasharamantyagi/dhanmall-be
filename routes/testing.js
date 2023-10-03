var express = require("express");
const AWS = require("aws-sdk");
const { plusUserMoney } = require("../models/Users");
const { setDataType } = require("../helpers");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    // plusUserMoney("6511578c85ec7a8f495384bc", {
    //   money: 20,
    // });
    return res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
