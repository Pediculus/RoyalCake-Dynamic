var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET admin page. */
router.get('/admin/signin', function(req, res, next) {
  res.render('admin-signin', { title: 'Admin Sign In' });
});

router.post('/admin/signin', function(req, res, next) {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password') {
    res.redirect('/admin/dashboard'); // Redirect to admin dashboard on successful sign-in
  } else {
    res.render('admin-signin', { title: 'Admin Sign In', error: 'Invalid credentials' });
  }
});

/* GET admin-dashboard */
router.get('/admin/dashboard', function(req, res, next) {
  res.render('admin-dashboard', { title: 'Admin Dashboard' });
});

module.exports = router;
