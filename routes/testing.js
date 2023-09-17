var express = require('express');
// const sdk = require('api')('@msg91api/v5.0#6n91xmlhu4pcnz');



var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    return res.json('respond with a resource');
});

module.exports = router;