const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const userController = require('./app/controllers/userController');
const db = require('./app/config/database'); 


const app = express();
const PORT = process.env.PORT || 3000
// Middlewares and configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "app", "views")); 

// Use the user controller for routes
app.use('/', userController);

// Handle task retrieval for the logged-in user

app.get('/', (req, res) => {
  const userId = req.session.userId; // Get the user's ID from the session

  const query = 'SELECT * FROM user_tasks WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Task retrieval error:', err);
          res.send('Task retrieval failed.');
      } else {
          // Render the 'welcome' template with the retrieved tasks and user ID
          res.render('welcome', { username: req.session.username, tasks: results, userId: userId });
      }
  });
});


// Task creation route
app.post('/create-task', (req, res) => {
  const userId = req.body.userId; // Retrieve the user's ID from the form
  const taskName = req.body.taskName;

  const query = 'INSERT INTO user_tasks (user_id, task_name, completed) VALUES (?, ?, ?)';
  db.query(query, [userId, taskName, 0], (err, result) => {
      if (err) {
          console.error('Task creation error:', err);
          res.send('Task creation failed.');
      } 
      else {
          console.log('Task created:', result);
          res.redirect('/'); // Redirect to the home page after task creation
      }
  });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
