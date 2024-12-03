const express = require("express");
const { verifyToken } = require("../utils/token-manager");
const { getAllUserMatches } = require("../controllers/matching-controllers");
const router = express.Router();
// const { processMatchRequest } = require("../controllers/matching-controllers.js");

router.get('/', (req, res) => {
    console.log('HIT');
})
// send email about matching request
// router.post('/request-match/:id');
// accept match route
// show all matches for a particular user route
router.get('/get-all-matches', verifyToken, getAllUserMatches);

module.exports = router;