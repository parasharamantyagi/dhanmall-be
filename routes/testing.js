var express = require('express');
// const sdk = require('api')('@msg91api/v5.0#6n91xmlhu4pcnz');



var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // sdk.auth('405460ALXj31E4nt64fc1d3eP1');
    // sdk.sendSms({
    //     template_id: 'EntertemplateID',
    //     short_url: '1 (On) or 0 (Off)',
    //     recipients: [{ mobiles: '917347332511', VAR1: 'VALUE1', VAR2: 'VALUE2' }]
    // })
    //     .then(({ data }) => console.log(data))
    //     .catch(err => console.error(err));

    return res.json('respond with a resource');
});

module.exports = router;