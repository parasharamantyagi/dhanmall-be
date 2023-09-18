var express = require("express");
const { Book } = require("../models/module.Book");
const { MyChildren } = require("../models/MyChildrens");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    // let data = await PostTest.findOne().populate('User').exec();
    let check = await MyChildren.findOne().exec();

    // Book.create({
    //     title: "book1",
    //     author: '6506f725106636f1b6b91a7c'
    // });
    res.status(200).json(check);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
