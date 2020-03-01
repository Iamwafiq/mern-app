const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserData = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', UserData)