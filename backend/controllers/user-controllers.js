const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const {createToken} = require('../utils/token-manager.js')

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status(200).json({message: 'OK', users});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'ERROR', cause: error.message});
    }
}

async function userSignUp(req, res, next) {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({name});
        const existingEmail = await User.findOne({email});
        if(existingUser){
            return res.status(401).send({error: "User already registered"});
        }
        if(existingEmail){
            return res.status(409).send({error: "Email already registered"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        await user.save();

        // create token and save cookie
        // res.clearCookie("auth_token", {
        //     httpOnly: true,
        //     domain: "localhost",
        //     path: "/",
        //     signed: true
        // });
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly: true,
            sameSite: "strict",
            signed: true,
            secure: true
        });

        return res.status(200).json({message: 'OK', id: user._id.toString()});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'ERROR', cause: error.message});
    }
}

async function userLogin(req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }
        // create token and save cookie
        // res.clearCookie("auth_token", {
        //     httpOnly: true,
        //     domain: "localhost",
        //     path: "/",
        //     sameSite: "None",
        //     signed: true
        // });
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly: true,
            sameSite: "strict",
            signed: true,
            secure: true
        });

        console.log("Cookie: " + res.getHeaders()['set-cookie']);

        return res.status(200).json({message: 'OK', id: user._id.toString()});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'ERROR', cause: error.message});
    }
}

async function verifyUser(req, res, next){
    try {
        const user = await User.findOneById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

async function getUserProfile (req, res) {
    try{
        const UID = res.locals.jwtData.id;
        const user = await User.findById(UID);

        if(!user){
            return res.status(404).json({message: "User not found."});
        }
        return res.status(200).json(user);
    } catch (error){
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

async function userLogout(req, res, next){
    try {
        const user = await User.find({_id: res.locals.jwtData.id});
        if(!user){
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
 
        if(user[0]._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie("auth_token", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            sameSite: "None",
            path: "/",
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

async function savePreferences(req, res, next) {
    try {
        const userId = res.locals.jwtData.id;


        const { cleanliness, sleepTime, smoking, alcohol, roomType, building, occupancy, age } = req.body;

        // Check if all required fields are provided
        if (
            cleanliness == null ||
            sleepTime == null ||
            smoking == null ||
            alcohol == null ||
            !roomType ||
            !building ||
            !occupancy ||
            !age
        ) {
            return res.status(400).json({ 
                message: "All preferences are required", 
                missingFields: { cleanliness, sleepTime, smoking, alcohol, roomType, building, occupancy, age } 
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.preferences = {
            cleanliness,
            sleepTime,
            smoking,
            alcohol,
            roomType,
            building,
            occupancy,
            age
        };

        await user.save();
        return res.status(200).json({ message: "Preferences saved successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving preferences", cause: error.message });
    }
}


module.exports = {getAllUsers, userSignUp, userLogin, verifyUser, userLogout, getUserProfile, savePreferences};
