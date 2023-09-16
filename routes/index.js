module.exports = function (app) {
  
    let authRoute = require('./api');
    app.use('/', authRoute);

    let otpRoute = require('./otp');
    app.use('/otp', otpRoute);

    let testingRoute = require('./testing');
    app.use('/testing', testingRoute);
    
  }