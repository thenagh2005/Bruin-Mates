const express = require("express");
const { verifyToken } = require("../utils/token-manager");
const { getAllAcceptedMatches, getAllPendingMatches, processMatchRequest, acceptMatchRequest, rejectMatchRequest } = require("../controllers/matching-controllers");
const router = express.Router();

router.post('/process-match/:id', verifyToken, processMatchRequest);
router.get('/get-accepted-matches', verifyToken, getAllAcceptedMatches);
router.get('/get-pending-matches', verifyToken, getAllPendingMatches);
router.post('/accept-match/:id', verifyToken, acceptMatchRequest);
router.post('/reject-match/:id', verifyToken, rejectMatchRequest);

module.exports = router;