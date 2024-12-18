const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: false },
    preferences: {
        cleanliness: { type: Number, min: 1, max: 5, required: false },
        sleepTime: { type: Number, min: 1, max: 5, required: false },
        smoking: { type: Boolean, required: false },
        alcohol: { type: Boolean, required: false },
        roomType: { 
            type: String, 
            enum: ['classic', 'deluxe', 'plaza', 'suite', 'University Apartments'], 
            required: false 
        },
        building: { type: String, required: false },
        occupancy: { type: String, required: false },
        genderInclusivity: { type: Boolean, required: false }
    },
    profileInfo: {
        profileName: {
            firstName: { type: String, required: false },
            lastName: { type: String, required: false }
        },
        biography: { type: String, required: false }, 
        age: { type: String, required: false },
        gender: {
            type: String, 
            enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say'], 
            required: false
        },
        pronouns: { type: String, required: false }
    },
    acceptedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model("User", userSchema);