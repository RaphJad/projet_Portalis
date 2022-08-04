//imports
var bcrypt   = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models   = require('../models');
//routes
module.exports = {
    create: function(req, res){
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var author  = jwtUtils.getLawyerID(headerAuth);

        if (author < 0){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        var title     = req.body.title;
        var content   = req.body.content;
        var date      = req.body.date;
        console.log(title)
        models.news.findOne({
            where: {title: title, content:content, author:author}
        }).then(function(newsFound){
            if(!newsFound){
                var new_news = models.news.create({
                    title: title,
                    content: content,
                    date: date,
                    validated: true,
                    author: author
                }).then(function(new_news){
                    return res.status(200).json({'news': new_news});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).json({'error': 'cannot add news'});
                });
            } else {
                return res.status(409).json({ 'error': 'news already exist'});
            }
        }).catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to check the news' });
        })
    },
    approveNews: function(req, res){
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var lawyer_id  = jwtUtils.getLawyerID(headerAuth);
        if (lawyer_id != 'OJ'){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        var title   = req.body.title;
        var content = req.body.content;
        var author  = req.body.author;

        models.news.findOne({
            where: {title: title, content: content, author:author}
        }).then(function(newsFound){
            console.log(newsFound);
            if(newsFound){
                newsFound.update({
                    validated: true
                }).then(function(){
                    return res.status(200).json({ 'state': 'validated'});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).json({'error': 'cannot change content'});
                })
            } else{
                return res.status(404).json({'error': 'no such news in the db'})
            }
        }).catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to check the news' });
        })        
    },
    update_news: function(req, res){
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var author  = jwtUtils.getLawyerID(headerAuth);
        console.log(author);
        if (author < 0){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        var old_title   = req.body.old_title;
        var new_title   = req.body.new_title;
        var new_content = req.body.new_content;
        var new_date    = req.body.new_date; 
        console.log(new_title)
        models.news.findOne({
            where: {title: old_title, author: author}
        }).then(function(foundNews){
            if(foundNews){
                foundNews.update({
                    title: new_title,
                    content: new_content,
                    date: new_date
                }).then(function(){
                    return res.status(200).json({ 'state': 'updated'});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).json({'error': 'cannot change content'});
                });
            } else {
                return res.status(404).json({'error': 'no such news in the db'})
            }
        }).catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to check the news' });
        })     
    },
    remove: function(req,res){
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var lawyer_id  = jwtUtils.getLawyerID(headerAuth);
        if (lawyer_id != 'OJ'){
            return res.status(400).json( { 'error' : 'wrong token' });
        }
        var title   = req.body.title;
        var content = req.body.content;
        var date    = req.body.date
        models.news.findOne({
            where: {title: title, content: content, date: date}
        }).then(function(foundNews){
            if(foundNews){
                models.news.destroy({
                    where: {title: title, content: content, date: date}
                }).then(function(){
                    return res.status(200).json({ 'status': 'deleted' });
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).json({'error': 'canoot delete the news'});
                })
            } else {
                return res.status(404).json({ 'error' : 'news to delete not found'});
            }
        }).catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to check the news' });
        })
    },
    getAllNews: function(req, res){
        models.news.findAll().then(function(newsFound){
            if(newsFound){
                //transform the content of a news into an array of paragraphs to be able to display it in the html
                for(let news in newsFound){
                    newsFound[news].content = newsFound[news].content.split('\n');
                    //change dateformat from us to europe
                    dArr = newsFound.split("-");  // ex input "2010-01-18"
                    return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2);
                }
                console.log()
                return res.status(200).json({"news": newsFound});
            } else {
                return res.status(404).json({'error': 'no news to show'});
            }
        }).catch(function(err){
            console.log(err);
            return res.status(500).json({ 'error': 'unable to check the news' });
        })
    }
};