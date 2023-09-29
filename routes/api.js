const express = require('express');
const { indexWelcome, registerReq, loginReq, resetPassword } = require('../controllers/index.controller');
const { registerValidator, loginValidator, verifyNumberValidator, saveBankCardValidator, resetPasswordValidator } = require('../validators/velidate.req');
const { isValid, isUserValid } = require('../validators');
const { verifyNumber, homeScreen } = require('../controllers/sms.controller');
const { myProfile, dashboardScreen, getOrders, saveOrders, gameNow, myChildren, GameHistory } = require('../controllers/product.controller');
const { gameInterval } = require('../controllers/cron.job.controller');
const { addPayment } = require('../controllers/payment.controller'); // // all for payment related
const { getRecharge, addRecharge, getBankCard, addBankCard, getBankCardById } = require('../controllers/recharge.controller');


const router = express.Router();

/* GET home page. */

router.get('/', indexWelcome);
router.post('/register', [registerValidator, isValid], registerReq);
router.post('/login', [loginValidator, isValid], loginReq);
router.post('/reset-password', [resetPasswordValidator, isValid], resetPassword);



router.get('/profile', isUserValid, myProfile);
router.get('/children', isUserValid, myChildren);


router.post('/dashboard', isUserValid, dashboardScreen);
router.get('/game-now', isUserValid, gameNow);
router.route('/order').get(isUserValid, getOrders).post(isUserValid, saveOrders);

router.post('/payment', isUserValid, addPayment);
router.route('/recharge').get(isUserValid, getRecharge).post(isUserValid, addRecharge);
router.route('/bank-card').get(isUserValid, getBankCard).post([isUserValid,saveBankCardValidator,isValid], addBankCard);
router.route('/bank-card/:_id').get(isUserValid, getBankCardById);


router.post('/verify-number', [verifyNumberValidator, isValid], verifyNumber);
router.get('/home-screen', isUserValid, homeScreen);

router.get('/game-history', isUserValid, GameHistory);
router.get('/game-interval', gameInterval);

module.exports = router;