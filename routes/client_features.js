const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const {getbooks, issuebook} = require('../controllers/client_features')

router.get("/", auth, getbooks);
router.post("/issue", auth, issuebook);
//router.post("/becomeadmin", auth, promotetoadmin);

module.exports = router;