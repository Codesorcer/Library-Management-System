const express = require('express');
const router = express.Router();

const { clientloginfn, adminloginfn, signupfn } = require('../controllers/auth');

router.post("/clientlogin", clientloginfn);
router.post("/adminlogin", adminloginfn);
router.post("/signup", signupfn);

module.exports = router;