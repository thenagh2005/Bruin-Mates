const express = require("express")
const router = express.Router();
const { getAllUsers, userLogin, userLogout, userSignUp, verifyUser } = require("../controllers/user-controllers.js");
const {validate, loginValidator, signUpValidator } = require("../utils/validators.js");
const { verifyToken } = require("../utils/token-manager.js");

router.get('/', getAllUsers);
router.post('/signup', validate(signUpValidator), userSignUp);
router.post('/login', validate(loginValidator), userLogin);
router.get("/auth-status", verifyToken, verifyUser);
router.get("/logout", verifyToken, userLogout);

module.exports = router;