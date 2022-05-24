//imports 
var express    = require('express');
var lawyerCtrl = require('./controller/lawyerCtrl')

//routes
exports.router = (function() {
    var apiRouter = express.Router();

    //lawyers route
    apiRouter.route('/lawyer/create/').post(lawyerCtrl.create);
    apiRouter.route('/lawyer/login/').post(lawyerCtrl.login);

    //cv_line

    return apiRouter;
})();