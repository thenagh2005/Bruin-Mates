const express = require("express");
const { verifyToken } = require("../utils/token-manager");
const { getAllAcceptedMatches, getAllPendingMatches, processMatchRequest } = require("../controllers/matching-controllers");
const router = express.Router();

router.get('/process-match/:id', verifyToken, processMatchRequest);
router.get('/get-accepted-matches', verifyToken, getAllAcceptedMatches);
router.get('/get-pending-matches', verifyToken, getAllPendingMatches);


module.exports = router;