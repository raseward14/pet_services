const router = require('express').Router();
const { Account } = require('../../models');

// /api/
router.post('/', async (req, res) => {
  try {
    const userData = await Account.create(req.body);
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;


    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await Account.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email, please try again' });
      return;
    }
    console.log(userData);
    console.log(req.body.password);

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json('richard');
  }
});

// /api/users/logout
router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    await req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log('user');
    res.status(404).end();
  }
});

module.exports = router;