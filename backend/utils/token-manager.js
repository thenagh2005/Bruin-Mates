const jwt = require("jsonwebtoken");
const COOKIE_NAME = "auth_token"

function createToken(id, email, expiresIn){
    const payload = {id, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
}

function verifyToken(req, res, next){
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim() === ""){
        return res.status(401).json({message: "Token not received"})
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if(err){
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            } else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        })
    })
}

module.exports = {createToken, verifyToken}