const express = require('express');
const router = express.Router();
const {adminauth, clientauth} = require('../middlewares/auth')
const {getbooks, issuebook, promotetoadmin} = require('../controllers/client_features')

router.get("/", clientauth, getbooks);
router.post("/issue", clientauth, issuebook);
router.post("/becomeadmin", clientauth, promotetoadmin);

module.exports = router;