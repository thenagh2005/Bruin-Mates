const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes.js');
const matchingRoutes = require('./matching-routes.js');

router.use('/user', userRoutes);
router.use('/matching', matchingRoutes);

module.exports = router;