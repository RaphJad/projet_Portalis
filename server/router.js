//imports 
var express    = require('express');
const cv_lineCtrl = require('./controller/cv_lineCtrl');
const lawyerCtrl = require('./controller/lawyerCtrl')

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
    apiRouter.route('/cv_line/create').post(cv_lineCtrl.create)
    apiRouter.route('/cv_line/remove').delete(cv_lineCtrl.remove)
    apiRouter.route('/cv_line/update').put(cv_lineCtrl.updateCvLine)
    return apiRouter;
})();