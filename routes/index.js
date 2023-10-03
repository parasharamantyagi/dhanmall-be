module.exports = function (app) {
  
    let authRoute = require('./api');
    app.use('/', authRoute);

    let autoRoute = require('./auto');
    app.use('/', autoRoute);

    let billingRoute = require('./billing');
    app.use('/billing', billingRoute);

    let otpRoute = require('./otp');
    app.use('/otp', otpRoute);

    let standardRoute = require('./standard');
    app.use('/standard', standardRoute);

    let testingRoute = require('./testing');
    app.use('/testing', testingRoute);
    
  }