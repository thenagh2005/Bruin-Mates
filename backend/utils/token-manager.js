const jwt = require("jsonwebtoken");
const COOKIE_NAME = "auth_token"

function createToken(id, email, expiresIn){
    const payload = {id, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
}

function verifyToken(req, res, next) {
    const token = req.signedCookies[`${COOKIE_NAME}`];

    console.log("verifyToken Middleware Called");
    console.log("Token Received:", token);

    if (!token || token.trim() === "") {
        console.log("Token not received or empty");
        return res.status(401).json({ message: "Token not received" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err.message);
            return res.status(401).json({ message: "Token Expired or Invalid" });
        }

        console.log("Token verified successfully:", decoded);

        console.log("Decoded JWT data:", decoded);

        res.locals.jwtData = decoded;
        next();
    });
}


async function isAuthenticated (req, res, next){
    const token = req.cookies;
    if(!token){
        return res.status(401).json({message: "You must be logged in."});
    }

    try{
        req.user = await User.findById(res.locals.jwtData.id);
        next();
    } catch (error){
        return res.status(401).json({message: "You must be logged in!"});
    }
}

module.exports = {createToken, verifyToken, isAuthenticated}