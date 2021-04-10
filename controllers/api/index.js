const router = require('express').Router();
const schedule = require('./schedule');
const userRoutes = require('./userRoutes')

router.use('/users', userRoutes)
router.use('/schedule', schedule);

module.exports = router;