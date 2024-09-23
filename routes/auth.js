const express = require('express')
const router = express.Router()

const {clientloginfn, adminloginfn, signupfn} = require("../controllers/auth")

router.route("/clientlogin").get(clientloginfn);
router.route("/adminlogin").get(adminloginfn);
router.route("/signup").get(signupfn);

module.exports = router;