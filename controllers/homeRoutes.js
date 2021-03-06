const router = require('express').Router();
const { Account, Appointment, Employee } = require('../models');
const withAuth = require('../utils/auth');
const helpers = require('../utils/jsHelp.js')

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
            appointment.get({ plain: true }));

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
router.get('/profile', async (req, res) => {
    try {
        const accountData = await Account.findByPk(req.session.id);
        const accounts = accountData.map((account) => account.get({ plain: true }));

        res.render('calendar', {
            accounts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// renders login page
router.get('/login', (req, res) => {
    // if user is already logged in, redirect req to another route
    if (req.session.logged_in) {
        res.redirect('/info');
        return;
    }
    res.render('login');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/info', withAuth, (req, res) => {
    res.render('info', {
        logged_in: true
    });
});

router.get('/signup', (req, res) => {
    // if user already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('info');
        return;
    }
    res.render('signup');
});

router.get('/calendar', withAuth, (req, res) => {
    // if user already logged in, redirect request to another route
    res.render('calendar', {
        logged_in: true
    });
});

module.exports = router;

