const express = require('express');
const { indexWelcome, registerReq, loginReq, resetPassword } = require('../controllers/index.controller');
const { registerValidator, loginValidator, verifyNumberValidator, saveBankCardValidator, resetPasswordValidator, changePasswordValidator, addRechargeValidator } = require('../validators/velidate.req');
const { isValid, isUserValid } = require('../validators');
const { verifyNumber, homeScreen } = require('../controllers/sms.controller');
const { dashboardScreen, getOrders, saveOrders, gameNow, GameHistory } = require('../controllers/product.controller');
const { addPayment } = require('../controllers/payment.controller'); // // all for payment related
const { getRecharge, addRecharge, getBankCard, addBankCard, getBankCardById, getWithdrawRequest, addWithdrawRequest, updateBankCardById } = require('../controllers/recharge.controller');
const { myProfile, myChildren, updatePassword, updateProfile } = require('../controllers/profile.controller');


const router = express.Router();

/* GET home page. */

router.get('/', indexWelcome);
router.post('/register', [registerValidator, isValid], registerReq);
router.post('/login', [loginValidator, isValid], loginReq);
router.post('/reset-password', [resetPasswordValidator, isValid], resetPassword);



router.get('/profile', isUserValid, myProfile);
router.get('/children', isUserValid, myChildren);
router.post('/change-password', [changePasswordValidator, isValid, isUserValid], updatePassword);
router.post('/update-profile', isUserValid, updateProfile);


router.post('/dashboard', isUserValid, dashboardScreen);
router.get('/game-now', isUserValid, gameNow);
router.route('/order').get(isUserValid, getOrders).post(isUserValid, saveOrders);

router.post('/payment', isUserValid, addPayment);
router.route('/recharge').get(isUserValid, getRecharge).post(addRechargeValidator, isValid, isUserValid, addRecharge);
router.route('/withdraw-request').get(isUserValid, getWithdrawRequest).post(isUserValid, addWithdrawRequest);
router.route('/bank-card').get(isUserValid, getBankCard).post([isUserValid,saveBankCardValidator,isValid], addBankCard);
router.route('/bank-card/:_id').get(isUserValid, getBankCardById).put(isUserValid, updateBankCardById);


router.post('/verify-number', [verifyNumberValidator, isValid], verifyNumber);
router.get('/home-screen', isUserValid, homeScreen);

router.get('/game-history', isUserValid, GameHistory);

module.exports = router;