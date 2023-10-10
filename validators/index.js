const { JWT_ACCESS_TOKEN, GDM_MODULE, ADMIN_USER } = require('../config');
const { checkObj } = require('../helpers');
const { jwt } = GDM_MODULE;

exports.isValid = (req, res, next) => {
  const { check, validationResult } = require('express-validator')
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    next();
  }
};


exports.isUserValid = async (req, res, next) => {
  try {
    const jwt_token = await jwt.verify(
      req.headers.authorization,
      JWT_ACCESS_TOKEN,
    );
    req.user = jwt_token;
    next();
  } catch (e) {
    return res.status(400).json({ status: 0, message: e.message });
  }
};

exports.isAdminValid = async (req, res, next) => {
  try {
    const jwt_token = await jwt.verify(
      req.headers.authorization,
      JWT_ACCESS_TOKEN,
    );
    if(checkObj(jwt_token,'mobile') && ADMIN_USER.includes(jwt_token.mobile)){
      req.user = jwt_token;
      next();
    }else{
      return res.status(404).json({ status: 0, message: 'Invalid user' });
    }
  } catch (e) {
    return res.status(400).json({ status: 0, message: e.message });
  }
};