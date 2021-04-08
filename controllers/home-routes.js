const router = require('express').Router();

router.get('/', async (req, res) => {
  // Add a comment describing the purpose of the render method
  // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
  res.render('index');
});

router.get('/profile', async (req, res) => {
  res.render('profile');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/about', async (req, res) => {
  res.render('about');
});

module.exports = router;