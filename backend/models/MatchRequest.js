const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    requester_id: { type: String, required: true }, // User who sent the request
    recipient_id: { type: String, required: true }, // User who received the request
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    }
});

module.exports = mongoose.model('Match', MatchSchema);