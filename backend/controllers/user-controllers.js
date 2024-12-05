const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const { createToken } = require('../utils/token-manager.js')

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function userSignUp(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ name });
        const existingEmail = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({ error: "User already registered" });
        }
        if (existingEmail) {
            return res.status(409).send({ error: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
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

        return res.status(200).json({ message: 'OK', id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function userLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
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

        return res.status(200).json({ message: 'OK', id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR', cause: error.message });
    }
}

async function verifyUser(req, res, next) {
    try {
        const user = await User.findOneById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

async function getUserProfile(req, res) {
    const user = await User.findOneById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
}

async function userLogout(req, res, next) {
    try {
        const user = await User.find({ _id: res.locals.jwtData.id });
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }

        if (user[0]._id.toString() !== res.locals.jwtData.id) {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

async function getCurrUserInfo(req, res, next) {
    try {
        const userId = res.locals.jwtData.id;

        // Check if all required fields are provided

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: 'OK', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving preferences", cause: error.message });
    }
}

async function updateProfile(req, res, next) {
    try {
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { preferences, profileInfo } = req.body;

        // Validate and update preferences
        if (preferences) {
            for (const key of Object.keys(preferences)) {
                if (preferences[key] != null && preferences[key] !== '') {
                    user.preferences[key] = preferences[key];
                }
            }
        }

        // Validate and update profile info
        if (profileInfo) {
            for (const key of Object.keys(profileInfo)) {
                if (profileInfo[key] != null && profileInfo[key] !== '') {
                    user.profileInfo[key] = profileInfo[key];
                }
            }
        }

        // Handle profile picture upload
        if (req.file) {
            const imageUrl = req.file.path; // Cloudinary secure URL from multer middleware
            user.profilePicture = imageUrl;
        }

        // Save the user
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                preferences: user.preferences,
                profileInfo: user.profileInfo,
                profilePicture: user.profilePicture,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating profile", cause: error.message });
    }
}

async function getUserInfo(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log("Coudn't find user");
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
}

async function uploadProfilePicture(req, res) {
    try {
        const userId = res.locals.jwtData.id;
        console.log('JWT user ID for picture upload:', userId); // Debug log

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found for picture upload:', userId); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }

        // The uploaded image URL from Cloudinary
        const result = req.file; // `req.file` contains Cloudinary response
        console.log('Received file from multer middleware:', result); // Debug log

        const imageUrl = result.path; // Secure URL to the uploaded image
        user.profilePicture = imageUrl;
        console.log('Updated profile picture URL:', imageUrl); // Debug log

        await user.save();
        console.log('User saved after profile picture update:', user); // Debug log

        return res.status(200).json({
            message: 'Profile picture uploaded successfully',
            imageUrl,
        });
    } catch (error) {
        console.error('Error uploading profile picture:', error); // Debug log
        return res.status(500).json({ message: 'Error uploading profile picture', cause: error.message });
    }
}


module.exports = { getAllUsers, userSignUp, userLogin, verifyUser, userLogout, getCurrUserInfo, getUserProfile, updateProfile, getUserInfo, uploadProfilePicture };
