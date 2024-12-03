const express = require('express');
const jwt = require('jsonwebtoken');
const async = require('async');
const nodemailer = require('nodemailer');
const User = require('../models/User.js');
const MatchRequest = require('../models/MatchRequest.js')

async function processMatchRequest(req, res, next){
    console.log('HIT PROCESS MATCH REQUEST')
    try {
        const sendingMatchToUserId = req.params.id;
        const currUserId = res.locals.jwtData.id;
        const currUser = await User.findById(currUserId);
        const sendingMatchToUser = await User.findById(sendingMatchToUserId);

        let matchRequest = {
            requester_id: currUserId,
            recipient_id: sendingMatchToUserId
        }
        const response = await MatchRequest.create(matchRequest);

        // let smtpTransport = nodemailer.createTransport({
        //     service: "Gmail",
        //     secure: false,
        //     auth: {
        //         user: process.env.GMAILACC,
        //         pass: process.env.GMAILAPPPW,
        //     },
        // });
        // let mailOptions = {
        //     to: sendingMatchToUser.email,
        //     from: '"Bruin Mates" bruinmates1919@gmail.com',
        //     subject: "Someone wants to match with you!",
        //     text:
        //         " SOMEONE WANTS TO CONNECT WITH YOU\n" +

        //         // insert link here
        //         "You can also view this message request  \n\n" +
        //         "Regards, \n" +
        //         "Bruin Mates",
        // };
        // smtpTransport.sendMail(mailOptions, (err) => {
        //     if(err){
        //         console.log('error sending mail' + err);
        //     } else {
        //         console.log("mail sent");
        //         console.log(
        //             "An e-mail has been sent to " +
        //             sendingMatchToUser.email +
        //             " with further instructions."
        //         );
        //     }
        // });
        return res.status(200).json({ message: 'OK'})
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function acceptMatchRequest(req, res, next){
    try {
        recipient_id = res.locals.jwtData.id;
        requester_id = req.params.id;
    
        const request = await Match.findOne({recipient_id: recipient_id, requester_id: requester_id});
        request.status = 'accepted';
        request.save();
        return res.status(200).json({message: 'OK'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function rejectMatchRequest(req, res, next){
    try {
        recipient_id = res.locals.jwtData.id;
        requester_id = req.params.id;
    
        const request = await Match.findOne({recipient_id: recipient_id, requester_id: requester_id});
        request.status = 'rejected';
        request.save();
        return res.status(200).json({message: 'OK'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}


async function getAllPendingMatches(res, res, next){
    console.log('HIT')
    try {
        const userId = res.locals.jwtData.id;
        const receivedRequests = await Match.find({ recipient_id: userId, status: 'pending' });

        return res.status(200).json({ message: 'OK', receivedRequests});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function getAllAcceptedMatches(res, res, next){
    console.log('HIT')
    try {
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        const acceptedMatches = await Match.find({ // both parties have agreed
            $or: [{ requester_id: userId }, { recipient_id: userId }],
            status: 'accepted'
        });

        return res.status(200).json({ message: 'OK', accepted_matches});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

module.exports = {getAllAcceptedMatches, getAllPendingMatches, processMatchRequest, acceptMatchRequest, rejectMatchRequest};