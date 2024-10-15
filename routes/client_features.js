const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const getbooks = require('../controllers/client_features')

router.get("/", auth, getbooks);

module.exports = router;