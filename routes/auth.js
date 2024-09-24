const express = require('express')
const router = express.Router()

const {clientloginfn, adminloginfn, signupfn} = require("../controllers/auth")

router.route("/clientlogin").get(clientloginfn);
router.route("/adminlogin").get(adminloginfn);
router.route("/signup").post(signupfn);

module.exports = router;