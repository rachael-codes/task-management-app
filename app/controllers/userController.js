const express = require('express');
const path = require('path');
const db = require('../config/database'); 
// const taskController = require('./taskController'); // Import the task controller


const router = express.Router();
const viewsPath = path.join(__dirname, '..', 'views');

router.get('/', (req, res) => {
    res.render(path.join(viewsPath, 'index'));
});

router.get('/login', (req, res) => {
    res.render(path.join(viewsPath, 'login'));
});

router.get('/register', (req, res) => {
    res.render(path.join(viewsPath, 'register'));
});

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Registration error:', err);
            res.send('Registration failed.');
        } else {
            console.log('User registered:', result);
            res.redirect('/login');
        }
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Login error:', err);
            res.send('Login failed.');
        } else {
          if (results.length > 0) {
            console.log('Login successful:', results[0]);
            // Render a welcome page with the username
            res.render('welcome', { username: results[0].username });

        } else {
                res.send('Invalid credentials.');
            }
        }
    });
});


module.exports = router;
