const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// WILL WORK ON THIS
// async function processMatchRequest(req, res, next){
//     console.log('HIT PROCESS MATCH REQUEST')
//     try {
//         const {sendingMatchToUserId} = req.body;
//         const currUserId = res.locals.jwtData.id;
//         const currUser = await User.findById(userId);
//         const sendingMatchToUser = await User.findById(sendingMatchToUserId);
//     } catch(error){
//         console.log(error);
//         return res.status(500).json({ message: 'ERROR', cause: error.message });
//     }
// }

async function getAllUserMatches(res, res, next){
    console.log('HIT')
    try {
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        pending_matches = user.matches.filter(match => match.pending);

        return res.status(200).json({ message: 'OK', pending_matches});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

module.exports = {getAllUserMatches}