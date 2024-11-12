const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    preferences: {
        cleanliness: { type: Number, min: 1, max: 5, default: null },
        sleepTime: { type: Number, min: 1, max: 5, default: null },
        smoking: { type: Boolean, default: null },
        alcohol: { type: Boolean, default: null },
        roomType: { type: String, enum: ['classic', 'deluxe', 'plaza', 'suite', 'universityApartments'], default: null },
        building: { type: String, default: null },
        occupancy: {type: String, default: null }
    }
})

module.exports = mongoose.model("User", userSchema);