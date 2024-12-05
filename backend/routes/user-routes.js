const express = require("express")
const router = express.Router();
const { getAllUsers, userLogin, userLogout, getCurrUserInfo, userSignUp, verifyUser, getUserProfile, updateProfile, getUserInfo } = require("../controllers/user-controllers.js");
const {validate, loginValidator, signUpValidator } = require("../utils/validators.js");
const { verifyToken } = require("../utils/token-manager.js");
const multerMiddleware = require('../utils/multer');

router.get('/', getAllUsers);
router.post('/signup', validate(signUpValidator), userSignUp);
router.post('/login', validate(loginValidator), userLogin);
router.get("/auth-status", verifyToken, verifyUser);
router.post("/logout", verifyToken, userLogout);
router.get("/view-profile", verifyToken, getUserProfile);
router.post('/update-profile', verifyToken, multerMiddleware, updateProfile);

router.get("/curr-user", verifyToken, getCurrUserInfo); 
router.get("/users/:id", getUserInfo);

module.exports = router;