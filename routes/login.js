const express = require('express');
const router = express.Router();
const db = require('../library/database'); // Adjust the path as necessary

// Display login form
router.get('/', (req, res) => {
  res.render('login/admin-signin');
});

// Handle login form submission
router.post('/', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      const user = results[0];
      
      // Store user info in session (or use a JWT for a stateless approach)
      req.session.user = user;

      // Redirect to /posts
      res.redirect('/posts');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

module.exports = router;