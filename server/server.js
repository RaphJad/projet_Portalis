//imports 
var express    = require('express');
var bodyParser = require('body-parser');
var apiRouter  = require('./router').router;
var cors = require('cors');
const { apply } = require('async');
//instantiate the server
var server = express();
server.use(cors());
//body-parser configuration récup les arguments et les paramètres fournis dans le corps d'une requete http
server.use(bodyParser.urlencoded({extend: true }));
server.use(bodyParser.json());


server.use('/api/', apiRouter);

//launch server
server.listen(3000, function() {
    console.log('server is running');
});