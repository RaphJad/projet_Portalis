//imports
var bcrypt   = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models   = require('../models');
//routes
module.exports = {
    create: function(req, res) {
        var firstname  = req.body.firstname;
        var lastname  = req.body.lastname;
        var birthdate = req.body.birthdate;
        var lawyer_id = req.body.lawyer_id;
        var password  = req.body.password;
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
                        password: bcryptedPassword
                    })
                    .then(function(new_lawyer) {
                        return res.status(201).json({
                            'lawyer\' id': new_lawyer.id
                        })
                    })
                    .catch(function(err) {
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
            where: {firstname: firstname, lastname: lastname}
        })
        .then(function(lawyerFound){
            if(lawyerFound){
                //compare the entred password with the one in the db
                bcrypt.compare(password, lawyerFound.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'lawyer\'s firstname': lawyerFound.firstname,
                            'lawyer\'s lastname': lawyerFound.lastname,
                            'token': 'the token'
                        });
                    } else {
                        return res.state(403).json({ 'error': 'invalid password' });
                    }         
                });
            } else {
                return res.status(404).json({ 'error': 'lawyer do not exist in the db'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the lawyer'});
        });
    }
}