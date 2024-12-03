const express = require("express");
const { verifyToken } = require("../utils/token-manager");
const { getAllAcceptedMatches, getAllPendingMatches } = require("../controllers/matching-controllers");
const router = express.Router();

router.get('/get-accepted-matches', verifyToken, getAllAcceptedMatches);
router.get('/get-pending-matches', verifyToken, getAllPendingMatches);


module.exports = router;