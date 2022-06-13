//imports
var bcrypt   = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models   = require('../models');
var cvline   = require('../controller/cv_lineCtrl.js');

//routes
module.exports = {
    create: function(req, res) {
        var firstname  = req.body.firstname;
        var lastname   = req.body.lastname;
        var birthdate  = req.body.birthdate;
        var lawyer_id  = req.body.lawyer_id;
        var password   = req.body.password;
        var status     = req.body.status;
        //send an error if the firstname or lastname ar nulls
        if (firstname == null || lastname == null){
            return res.status(400).json({'error': 'missing parameters'});
        }
        //adding the lawyer to the database
        //checking if not already exist
        models.lawyer.findOne({
            where: {firstname: firstname, lastname: lastname}
        })
        .then(function(lawyerfound){
            if(!lawyerfound){
                //hashing the password before adding it into the db
                bcrypt.hash(password, 10, function( err, bcryptedPassword){
                    //create a new layer in the db with the following parameters
                    var new_lawyer = models.lawyer.create({
                        firstname: firstname,
                        lastname: lastname,
                        birthdate: birthdate,
                        lawyer_id: lawyer_id,
                        password: bcryptedPassword,
                        status: status
                    })
                    .then(function(new_lawyer) {
                        return res.status(201).json({
                            'lawyer\' id': new_lawyer.id
                        })
                    })
                    .catch(function(err) {
                        console.log(err);
                        return res.status(500).json({ 'error': 'cannot add user'});
                    });
                });
            } else {
                return res.status(409).json({ 'error': 'lawyer already exist'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the lawyer' });
        })
    },
    login: function(req, res) {
        // parameters 
        var lawyer_id = req.body.lawyer_id;
        var password  = req.body.password;

        //Checking not nul parameters
        if(lawyer_id == null || password == null){
            return res.status(400).json({'error': 'missing parameters'})
        }
        models.lawyer.findOne({
            where: {lawyer_id: lawyer_id}
        })
        .then(function(lawyerFound){
            if(lawyerFound){
                //compare the entred password with the one in the db
                bcrypt.compare(password, lawyerFound.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'lawyer\'s firstname': lawyerFound.firstname,
                            'lawyer\'s lastname': lawyerFound.lastname,
                            'token': jwtUtils.generateTokenForLawyer(lawyerFound),
                            'status': "success"
                        });
                    } else {
                        return res.status(401).json({ 'error': "invalid password" });
                    }         
                });
            } else {
                return res.status(404).json({ 'error': 'lawyer do not exist in the db'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the lawyer'});
        });
    },
    get_lawyer_info: async function(req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var lawyer_id  = jwtUtils.getLawyerID(headerAuth);
        if (lawyer_id < 0){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        models.lawyer.findOne({
            attributes: ['firstname', 'lastname', 'birthdate', 'lawyer_id'],
            where: {lawyer_id: lawyer_id}
        }).then(async function(lawyer) {
            if(lawyer != null) {
                lawyer_cvline = await cvline.getLineByLawyer_for_backend(lawyer.lawyer_id);
                var lawyer = {"full_name": lawyer.firstname + " " + lawyer.lastname, "birthdate":lawyer.birthdate, "lawyer_id":lawyer.lawyer_id, "lines_sch":lawyer_cvline.lines_sch, "lines_pub":lawyer_cvline.lines_pub, "lines_foe":lawyer_cvline.lines_foe, "lines_exp":lawyer_cvline.lines_exp, "lines_pro":lawyer_cvline.lines_pro, "lines_edu":lawyer_cvline.lines_edu, "lines_lang":lawyer_cvline.lines_lang, "lines_other":lawyer_cvline.lines_foe};
                return res.status(201).json(lawyer);
            } else {
                return res.status(404).json( { 'error' : 'lawyer not found'});
            }
        }).catch(function(err) {
            return res.status(500).json( { 'error' : 'cannot fetch the lawyer'});
        });
    },
    getAllLwyer: function(req, res) {
        models.lawyer.findAll({
            attributes: ['firstname', 'lastname', 'birthdate', 'lawyer_id','status']
        })
        .then(function(lawyers) {
            if (lawyers) {
                return res.status(200).json({
                    lawyers
                });
            } else {
                return res.status(404).json({'error': 'no lawyer found'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the lawyers'});
        })
    },
    //TODO: refaire la méthode prorprement si j'ai le temps
    remove_lawyer: async function(req,res){
        //parameters
        var lawyer_id = req.body.lawyer_id;

        await models.lawyer.destroy({
            where: {lawyer_id: lawyer_id}
        })
        return res.status(200).json({'status': 'done'});
    },
    
    async get_lawyer_AS(req, res) {
        var status = "AS";
        models.lawyer.findAll({
            attributes: ['firstname', 'lastname', 'birthdate', 'lawyer_id','status'],
            where: {status: status}
        }).then(async function (lawyers){
            if (lawyers) {
                    //add the cv line to the lawyers before sending them
                    for (let i=0, len=lawyers.length; i<len; i++){
                        lawyer_cvlines = await cvline.getLineByLawyer_for_backend(lawyers[i].lawyer_id);
                        console.log(lawyer_cvlines);
                        lawyers[i] = {"full_name": lawyers[i].firstname + " " + lawyers[i].lastname, "birthdate":lawyers[i].birthdate, "lawyer_id":lawyers[i].lawyer_id,"lines_sch": lawyer_cvlines.lines_sch, "lines_pub": lawyer_cvlines.lines_pub, "lines_foe": lawyer_cvlines.lines_foe};
                    }
                    return res.status(200).json({lawyers});
            } else {
                return res.status(404).json({'error': 'no lawyer found'});
            }
        })
    },
    async get_lawyer_COL(req, res) {
        var status = "COL";
        models.lawyer.findAll({
            where: {status: status},
            attributes: ['firstname', 'lastname', 'birthdate', 'lawyer_id','status']
        })
        .then(async function(lawyers){
            if (lawyers) {
                //add the cv line to the lawyers before sending them
                for (let i=0, len=lawyers.length; i<len; i++){
                    lawyer_cvlines = await cvline.getLineByLawyer_for_backend(lawyers[i].lawyer_id);
                    lawyers[i] = {"full_name": lawyers[i].firstname + " " + lawyers[i].lastname, "birthdate":lawyers[i].birthdate, "lawyer_id":lawyers[i].lawyer_id,"lines_sch": lawyer_cvlines.lines_sch, "lines_pub": lawyer_cvlines.lines_pub, "lines_foe": lawyer_cvlines.lines_foe};
                }
                return res.status(200).json({lawyers});
            } else {
                return res.status(404).json({'error': 'no lawyer found'});
            }
        }).catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the lawyers'});
        });
    },
    async get_lawyer_COLX(req, res) {
        var status = "COLX";
        models.lawyer.findAll({
            where: {status: status},
            attributes: ['firstname', 'lastname', 'birthdate', 'lawyer_id','status']
        })
        .then(async function(lawyers){
            if (lawyers) {
                //add the cv line to the lawyers before sending them
                for (let i=0, len=lawyers.length; i<len; i++){
                    lawyer_cvlines = await cvline.getLineByLawyer_for_backend(lawyers[i].lawyer_id);
                    lawyers[i] = {"full_name": lawyers[i].firstname + " " + lawyers[i].lastname, "birthdate":lawyers[i].birthdate, "lawyer_id":lawyers[i].lawyer_id,"lines_sch": lawyer_cvlines.lines_sch, "lines_pub": lawyer_cvlines.lines_pub, "lines_foe": lawyer_cvlines.lines_foe};
                }
                return res.status(200).json({lawyers});
            } else {
                console.log(lawyers)
                return res.status(404).json({'error': 'no lawyer found'});
            }
        }).catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the lawyers'});
        });
    }
}