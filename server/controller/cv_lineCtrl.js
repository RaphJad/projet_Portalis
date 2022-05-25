//imports
var bcrypt   = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models   = require('../models');
//routes
module.exports = {
    create: function(req, res){
        //getting the tokens and the lawyer's id
        var headerAuth = req.headers['authorization'];
        var lawyer_id  = jwtUtils.getLawyerID(headerAuth);
        if(lawyer_id < 0){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        //parameters for the cv_line
        var content   = req.body.content;
        var date      = req.body.date;
        var type      = req.body.type;
        if (content == null || type == null || lawyer_id == null){
            return res.status(400).json({'error': 'missing parameters'});
        }
        if(type != 'sch' && type != 'pub' && type != 'foe'){
            return res.status(400).json({'error': 'wrong type, must be sch for scholar, pub for a publication or a coloc and foe for a field of expertise'});
        }
        models.cv_line.findOne({
            where: {content: content, lawyer_id: lawyer_id}
        })
        .then(function(lineFound){
            if(!lineFound){
                var new_cv_line = models.cv_line.create({
                    content: content,
                    date: date,
                    type: type,
                    lawyer_id: lawyer_id
                })
                .then(function(new_cv_line){
                    return res.status(201).json({
                        'cv_line': new_cv_line
                    });
                })
                .catch(function(err){
                    console.log(err)
                    return res.status(500).json({ 'error' : 'cannot add cvline'});
                });
                console.log(new_cv_line);
            } else {
                return res.status(500).json({'error': 'cv line already esxist'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to check the cv_line' });
        })
    },
    remove: async function(req, res){
        //getting the tokens and the lawyer's id
        var headerAuth = req.headers['authorization'];
        var lawyer_id  = jwtUtils.getLawyerID(headerAuth);
        if(lawyer_id < 0){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        var content = req.body.content;
        models.cv_line.findOne({
            where: {lawyer_id: lawyer_id, content: content}
        }).then( async function(lineFound){
            if(lineFound){
                await models.cv_line.destroy({
                    where: {lawyer_id: lawyer_id, content: content}
                })
                return res.status(200).json({'status': 'done'});
            } else {
                return res.status(404).json({ 'error': 'line to delete not found'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error':'unable to remove the line'});
        })
    },
    updateCvLine: function(req, res) {
        //getting the tokens and the lawyer's id
        var headerAuth = req.headers['authorization'];
        var lawyer_id  = jwtUtils.getLawyerID(headerAuth);
        if(lawyer_id < 0){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        var old_content = req.body.old_content;
        var new_content = req.body.new_content;
        var new_date = req.body.new_date;
        models.cv_line.findOne({
            where: {lawyer_id: lawyer_id, content: old_content}
        }).then(function (lineFound){
            if (lineFound){
                lineFound.update({
                    content: new_content,
                    date: new_date
                }).then(function(){
                    return res.status(200).json({ 'state': 'done'});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).json({'error': 'cannot change content'});
                });
            }
        }).catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to check the line' });
        })
    }
}
