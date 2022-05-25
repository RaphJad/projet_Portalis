//imports 
var express    = require('express');
var lawyerCtrl = require('./controller/lawyerCtrl')

//routes
exports.router = (function() {
    var apiRouter = express.Router();
    
    //lawyers route
    apiRouter.route('/lawyer/create/').post(lawyerCtrl.create);
    apiRouter.route('/lawyer/login/').post(lawyerCtrl.login);
    apiRouter.route('/lawyer/getLawyerInfos/').get(lawyerCtrl.get_lawyer_info);
    apiRouter.route('/lawyer/getLawyers/').get(lawyerCtrl.getAllLwyer);
    apiRouter.route('/lawyer/rmLawyer/').delete(lawyerCtrl.remove_lawyer);
    //cv_line

    return apiRouter;
})();