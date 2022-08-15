//imports 
var express    = require('express');
const cv_lineCtrl = require('./controller/cv_lineCtrl');
const lawyerCtrl = require('./controller/lawyerCtrl');
const newsCtrl = require('./controller/newsCtrl');
//routes
exports.router = (function() {
    var apiRouter = express.Router();
    //lawyers route
    apiRouter.route('/lawyer/create/').post(lawyerCtrl.create);
    apiRouter.route('/lawyer/login/').post(lawyerCtrl.login);
    apiRouter.route('/lawyer/getLawyerInfos/').get(lawyerCtrl.get_lawyer_info);
    apiRouter.route('/lawyer/getLawyers/').get(lawyerCtrl.getAllLwyer);
    apiRouter.route('/lawyer/remove/').delete(lawyerCtrl.remove_lawyer);
    apiRouter.route('/lawyer/getLawyerAS/').get(lawyerCtrl.get_lawyer_AS);
    apiRouter.route('/lawyer/getLawyerCOL/').get(lawyerCtrl.get_lawyer_COL);
    apiRouter.route('/lawyer/getLawyerCOLX/').get(lawyerCtrl.get_lawyer_COLX);
    //cv_line
    apiRouter.route('/cv_line/create').post(cv_lineCtrl.create);
    apiRouter.route('/cv_line/remove').delete(cv_lineCtrl.remove);
    apiRouter.route('/cv_line/update').put(cv_lineCtrl.updateCvLine);
    apiRouter.route('/cv_line/getAll').get(cv_lineCtrl.getallLines);

    //news
    apiRouter.route('/news/create').post(newsCtrl.create);
    apiRouter.route('/news/approve').put(newsCtrl.approveNews);
    apiRouter.route('/news/update').put(newsCtrl.update_news);
    apiRouter.route('/news/remove').delete(newsCtrl.remove);
    apiRouter.route('/news/getAll').get(newsCtrl.getAllNews);
    apiRouter.route('/news/getAllValidated').get(newsCtrl.getValidatedNews);
    apiRouter.route('/news/getAllUnvalidated').get(newsCtrl.getUnvalidatedNews);

    return apiRouter;
})();