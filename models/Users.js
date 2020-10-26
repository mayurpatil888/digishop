const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    client_id: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_type: {
        type: String,
        enum: ['owner', 'customer', 'delivery'],
        default: 'customer'
    }
});

module.exports = User = mongoose.model('user', UserSchema);