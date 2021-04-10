const router = require('express').Router();
const sequelize = require('../../config/connection.js');
const { Employee } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;