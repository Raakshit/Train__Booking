const express = require('express');
const { getseats, createseats, bookseats } = require('../Controller/SeatController');

const router = express.Router();
router.route('/').get(getseats);
router.route('/create').post(createseats);
router.route('/bookseat').put(bookseats);

module.exports = router;