const express = require('express')
const router = express.Router()

const {loginfn, signupfn} = require("../controllers/auth")

router.route("/login").get(loginfn);
router.route("/signut").get(signupfn);

module.exports = router;