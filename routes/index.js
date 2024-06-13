var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM cake', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('index', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('index', {
                data: rows // <-- data posts
            });
        }
    });
});


module.exports = router;
