const express = require('express');
const router = express.Router();

const {clientloginpage} = require('../controllers/pages');

router.route('/clientlogin').get(clientloginpage);

module.exports = router;