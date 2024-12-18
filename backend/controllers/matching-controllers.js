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
    
        const request = await MatchRequest.findOne({recipient_id: recipient_id, requester_id: requester_id});
        request.status = 'accepted';
        request.save();
        const user1 = await User.findById(recipient_id);
        const user2 = await User.findById(requester_id);
        user1.acceptedUsers.push(user2._id);
        user2.acceptedUsers.push(user1._id);
        user1.save();
        user2.save();
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
    
        const request = await MatchRequest.findOne({recipient_id: recipient_id, requester_id: requester_id});
        request.status = 'rejected';
        request.save();
        return res.status(200).json({message: 'OK'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}


async function getAllPendingMatches(req, res, next){
    try {
        const userId = res.locals.jwtData.id;
        const receivedRequests = await MatchRequest.find({ recipient_id: userId, status: 'pending'});

        return res.status(200).json({ message: 'OK', receivedRequests});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function getAllAcceptedMatches(req, res, next){
    console.log('HIT')
    try {
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        const acceptedMatches = await MatchRequest.find({ // both parties have agreed
            $or: [{ requester_id: userId }, { recipient_id: userId }],
            status: 'accepted'
        });
        console.log(user)
        const matches = [];
        if(user.acceptedUsers){
            for(const id of user.acceptedUsers){
                console.log(id); // Logs each ID
                const friend = await User.findById(id);
                if (friend) {
                    matches.push(friend); // Add the friend to the matches array
                }
            }
        }
        console.log('matches')
        console.log(matches);
        return res.status(200).json({ message: 'OK', matches: matches});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function getMatchStatus(req, res, next){
    try {
        const currUserId = res.locals.jwtData.id;
        const user2Id = req.params.id;
        console.log(currUserId);
        console.log(user2Id);
        let status = 'na';
        const match = await MatchRequest.find({ 
            $or: [
                { requester_id: user2Id, recipient_id: currUserId }, 
                { requester_id: currUserId, recipient_id: user2Id }
            ]
        });

        if(match[0]){
            status = match[0].status;
            console.log(status)
        }
        return res.status(200).json({ message: 'OK', status: status});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function removeMatch(req, res, next){
    try {
        const userIdToRemove = req.params.id;
        const currUserId = res.locals.jwtData.id;
        const currUser = await User.findById(currUserId);
        const user2 = await User.findById(userIdToRemove);

        console.log(currUser.acceptedUsers);
        let matches = currUser.acceptedUsers.filter(user_id => user_id != userIdToRemove);

        currUser.acceptedUsers = matches;
        currUser.save();
        console.log('************')
        console.log(user2.acceptedUsers);
        let matches2 = user2.acceptedUsers.filter(user_id => user_id != currUserId);
        user2.acceptedUsers = matches2;
        user2.save();
        console.log(user2.acceptedUsers);
        console.log('************')

        // change match status
        const match = await MatchRequest.find({ 
            $or: [
                { requester_id: userIdToRemove, recipient_id: currUserId }, 
                { requester_id: currUserId, recipient_id: userIdToRemove }
            ],
            status: 'accepted'
        });
        console.log(match)
        match[0].status = 'rejected';
        match[0].save();

        return res.status(200).json({message: 'OK'});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

module.exports = {getAllAcceptedMatches, getAllPendingMatches, processMatchRequest, acceptMatchRequest, rejectMatchRequest, getMatchStatus, removeMatch};