const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// WILL WORK ON THIS
// async function processMatchRequest(req, res, next){
//     user2_id = req.params.id;
//     console.log('HIT')
//     // console.log(req.user.id);
//     const token = req.headers['authorization']?.split(' ')[1];
//     jwt.verify(token, 'auth_token', (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid token!' });
//         }

//         // Access user ID from the token payload
//         req.userId = decoded.id; // Assuming 'id' is the key for user ID in the payload
//         console.log(req.userId);
//         // next(); // Proceed to the next middleware or route handler
//     });
//     // console.log(res.locals.jwtData.id)
// }

async function getAllUserMatches(res, res, next){
    console.log('HIT')
    const userId = res.locals.jwtData.id;

    const user = await User.findById(userId);
    console.log(user);
}

module.exports = {getAllUserMatches}