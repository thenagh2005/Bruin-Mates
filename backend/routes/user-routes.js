const express = require("express")
const router = express.Router();
const { getAllUsers, userLogin, userLogout, userSignUp, verifyUser, getUserProfile } = require("../controllers/user-controllers.js");
const {validate, loginValidator, signUpValidator } = require("../utils/validators.js");
const { verifyToken, isAuthenticated } = require("../utils/token-manager.js");

router.get('/', getAllUsers);
router.post('/signup', validate(signUpValidator), userSignUp);
router.post('/login', validate(loginValidator), userLogin);
router.get("/auth-status", verifyToken, verifyUser);
router.post("/logout", verifyToken, userLogout);
router.get("/view-profile", verifyToken, getUserProfile);
router.post("/preferences", verifyToken, savePreferences);

module.exports = router;