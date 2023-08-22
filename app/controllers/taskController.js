// app/controllers/taskController.js


exports.home = (req, res) => {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login page
    }
    res.render('home', { user: req.session.user }); // Render home page with user data
  };
  
  exports.uploadProfilePicture = (req, res) => {
    // Implement profile picture upload logic here
    // You can use libraries like multer to handle file uploads
    // Update the user's profile picture URL in the database
    // Redirect back to the home page
  };
  