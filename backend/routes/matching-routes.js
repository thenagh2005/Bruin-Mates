const express = require("express");
const { verifyToken } = require("../utils/token-manager");
const { getAllAcceptedMatches, getAllPendingMatches, processMatchRequest, acceptMatchRequest, rejectMatchRequest, getMatchStatus } = require("../controllers/matching-controllers");
const router = express.Router();

router.get('/get-accepted-matches', verifyToken, getAllAcceptedMatches);
router.get('/get-pending-matches', verifyToken, getAllPendingMatches);
router.get('/match-status/:id', verifyToken, getMatchStatus)
router.post('/process-match/:id', verifyToken, processMatchRequest);
router.post('/accept-match/:id', verifyToken, acceptMatchRequest);
router.post('/reject-match/:id', verifyToken, rejectMatchRequest);

module.exports = router;