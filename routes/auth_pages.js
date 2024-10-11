const express = require('express');
const router = express.Router();

const {clientloginpage, adminloginpage, signuppage} = require('../controllers/auth_pages');

router.route('/clientlogin').get(clientloginpage);
router.route('/adminlogin').get(adminloginpage);
router.route('/signup').get(signuppage);

module.exports = router;