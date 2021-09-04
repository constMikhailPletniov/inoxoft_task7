/* eslint-disable sort-keys */
const { Schema, model } = require('mongoose');
const { userRoleEnum } = require('../config');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        default: userRoleEnum.USER,
        enum: Object.values(userRoleEnum),
        type: String
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
