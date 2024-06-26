var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');


/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM cake ORDER BY cake_id asc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('products', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('products/index', {
                data: rows // <-- data posts
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('products/create', {
        cake_name: '',
        price: '',
        description: '',
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    

    let cake_name   = req.body.cake_name;
    let price = req.body.price;
    let description = req.body.description;
    let errors  = false;

    if(cake_name.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('products/create', {
            cake_name: cake_name,
            price: price,
            description : description,
        })
    }

    if(price.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('products/create', {
            cake_name: cake_name,
            price: price,
            description : description,
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            cake_name: cake_name,
            price: price,
            description : description,

        }
        
        // insert query
        connection.query('INSERT INTO cake SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('products/create', {
                    cake_name: formData.cake_name,
                    price: formData.price,
                    description: formData.description,                
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/products');
            }
        })
    }

})

/**
 * EDIT POST
 */
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM cake WHERE cake_id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/products')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('products/edit', {
                cake_id:      rows[0].cake_id,
                cake_name:   rows[0].cake_name,
                price: rows[0].price,
                description: rows[0].description,
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.post('/update/:id', function(req, res, next) {

    let cake_id      = req.params.id; // Corrected from req.params.cake_id to req.params.id
    let cake_name   = req.body.cake_name;
    let price = req.body.price;
    let description = req.body.description;
    let errors  = false;

    if(cake_name.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to edit.ejs with flash message
        res.render('products/edit', {
            cake_id:         cake_id, // Corrected from req.params.cake_id to cake_id
            cake_name:      cake_name,
            price:    price,
            description: description,
        })
    }

    if(price.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to edit.ejs with flash message
        res.render('products/edit', {
            cake_id:         cake_id, // Corrected from req.params.cake_id to cake_id
            cake_name:      cake_name,
            price:    price,
            description: description,
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            cake_name:      cake_name,
            price:    price,
            description: description,
        }

        // update query
        connection.query('UPDATE cake SET ? WHERE cake_id = ?', [formData, cake_id], function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('products/edit', {
                    cake_id:     cake_id, // Corrected from req.params.cake_id to cake_id
                    cake_name:   formData.cake_name,
                    price: formData.price,
                    description: formData.description,
                    
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/products');
            }
        })
    }
})

/**
 * DELETE POST
 */
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM cake WHERE cake_id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to posts page
            res.redirect('/products')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to posts page
            res.redirect('/products')
        }
    })
})

module.exports = router;
