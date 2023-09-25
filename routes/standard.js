const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/payment", async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 1,
      message: "Payment redirect message",
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
});
module.exports = router;
