const router = require('express').Router();
const { Account, Appointment, Employee } = require('../models');
const withAuth = require('../utils/auth');

// renders the homepage
router.get('/', async (req, res) => {
    try {
        // get all appointments and JOIN with account data
        const appointmentData = await Appointment.findAll({
            include: [
                {
                    model: Account,
                    attributes: ['name'],
                },
            ],
        });

        // serialize data so the tamplate can read it
        const appointments = appointmentData.map((appointment) =>
        appointment.get ({ plain: true }));

        // pass serialized data and session flag into template
        res.render('index', {
            appointments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// renders your profile, use withAuth middleware to prevent access
router.get('/profile', withAuth, async (req, res) => {
    try {
        // find logged in user based on the session ID
        const accountData = await Account.findByPk(req.session.id, {
            include: [{ model: Appointment  }]
        })

        // serialize data for template
        const account = accountData.get({ plain: true });

        // render profile handlebars, otherwise redirect to login
        if (req.session.logged_in) {
            res.render('profile', {
                ...account,
                logged_in: true
            });
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// renders login page
router.get('/login', (req, res) => {
    // if user is already logged in, redirect req to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/info', (req, res) => {
    res.render('info');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/calendar', withAuth, (req, res) => {
    if (req.session.logged_in) {
        res.render('calendar');
    } else {
        res.redirect('/login');
    }
   
})

module.exports = router;

