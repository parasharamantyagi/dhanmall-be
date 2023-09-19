var express = require("express");
const { MyChildren, updateMyChildren } = require("../models/MyChildrens");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let check = true;
    // let check = await Author.updateOne({_id: '6509dcbd7742fed0a17dc783'}, { $inc: { money: 50 } });
    return res.status(200).json(check);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
