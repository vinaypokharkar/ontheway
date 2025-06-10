const express = require('express');


const { getPassenger, getPassengerByName, postPassenger } = require('../controllers/passController');
// const { verifyPassenger } = require('../middleware/passValidation');
// const { passengerValidation } = require('../middleware/passValidation');

const router = express.Router();

//get route
router.get('/', getPassenger);

//get route by name
router.get('/:name', getPassengerByName);

// post route
router.post('/post', postPassenger);


module.exports = router;