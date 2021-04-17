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

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/info', (req, res) => {
    //res.render('info', {
    //logged_in: req.session.logged_in
    //});
    res.render('info');
});

router.get('/signup', (req, res) => {
    // if user already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('info');
        return;
    }
    res.render('signup');
});

router.get('/calendar', (req, res) => {

    //try {
    //const employeeData = await Employee.findAll();
    //const employees = employeeData.map((employee) => employee.get({ plain: true }));
    //console.log(condenseScheduleObjWeeks([employees[0].week1, employees[0].week2, employees[0].week3, employees[0].week4]))
    // let times = employees.map((employee) => condenseScheduleObjWeeks([employee.week1, employee.week2, employee.week3, employee.week4]))
    // console.log(times)

    //res.render('calendar', {
    //employees,
    // logged_in: req.session.logged_in
    //});
    //} catch (err) {
    //res.status(500).json(err);
    //}
    res.render('calendar');
});

module.exports = router;

