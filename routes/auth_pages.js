const express = require('express');
const router = express.Router();

const {clientloginpage, adminloginpage, signuppage} = require('../controllers/auth_pages');

router.get("/clientlogin", clientloginpage);
router.get("/adminlogin", adminloginpage);
router.get("/signup", signuppage);

module.exports = router;