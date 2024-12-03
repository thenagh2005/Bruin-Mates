const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const MatchRequest = require('../models/MatchRequest.js')

// WILL WORK ON THIS
async function processMatchRequest(req, res, next){
    console.log('HIT PROCESS MATCH REQUEST')
    try {
        const { sendingMatchToUserId } = req.body;
        const currUserId = res.locals.jwtData.id;
        const currUser = await User.findById(userId);
        const sendingMatchToUser = await User.findById(sendingMatchToUserId);

        async.waterfall(
            [
                function (done) {
                    crypto.randomBytes(20, (err, buf) => {
                        var token = buf.toString("hex");
                        done(err, token);
                    });
                },
                function (token, done) {
                    // add code here to add matches to the users data
                },
                function (token, user, done) {
                    let smtpTransport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: process.env.GMAILACC,
                            pass: process.env.GMAILAPPPW,
                        },
                    });
                    let mailOptions = {
                        to: sendingMatchToUser.email,
                        from: '"Bruin Mates" bruinmates1919@gmail.com',
                        subject: "Someone wants to match with you!",
                        text:
                            " SOMEONE WANTS TO CONNECT WITH YOU\n" +

                            // insert link here
                            "You can also view this message request  \n\n" +
                            "Regards, \n" +
                            "Bruin Mates",
                    };
                    smtpTransport.sendMail(mailOptions, (err) => {
                        console.log("mail sent");
                        console.log(
                            "An e-mail has been sent to " +
                            sendingMatchToUser.email +
                            " with further instructions."
                        );
                        done(err, "done");
                    });
                },
            ],
            function (err) {
                // error handling
            }
        );

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

module.exports = {getAllAcceptedMatches, getAllPendingMatches, processMatchRequest};