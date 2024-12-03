const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
        cleanliness: { type: Number, min: 1, max: 5, required: false },
        sleepTime: { type: Number, min: 1, max: 5, required: false },
        smoking: { type: Boolean, required: false },
        alcohol: { type: Boolean, required: false },
        roomType: { 
            type: String, 
            enum: ['classic', 'deluxe', 'plaza', 'suite', 'universityApartments'], 
            required: false 
        },
        building: { type: String, required: false },
        occupancy: { type: String, required: false },
        age: { 
            type: String, 
            enum: ['under 18', '18', '19', '20', '21', '22', '23+'], 
            required: false 
        }
    },
    matches: [{
        user_id: {type: String},
        hasAccepted: {type: Boolean, default: false}
    }]
});

module.exports = mongoose.model("User", userSchema);