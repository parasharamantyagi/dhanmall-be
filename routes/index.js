module.exports = function (app) {
  
    let authRoute = require('./api');
    app.use('/', authRoute);

    let testingRoute = require('./testing');
    app.use('/testing', testingRoute);
    
  }