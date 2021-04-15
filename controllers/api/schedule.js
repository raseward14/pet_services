const router = require('express').Router();
const helpers = require('../../utils/jsHelp.js')
const sequelize = require('../../config/connection.js');
const { Employee } = require('../../models')

router.get('/dates', async (req, res) => {
  try {
    const employees = await Employee.findAll();

    const times = employees.map((employee) => employee.get({ plain: true }));
    res.status(200).json(helpers.simplifyTimeSlots(times));
  } catch (err) {
    res.status(500).json(err);
  }
})

//router.get('/dates', (req, res) => {

//})

module.exports = router;