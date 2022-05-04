// Import mongoose
const mongoose = require('../../connectDB');
// Tạo Schema
const Schema = mongoose.Schema
var d = new Date()
// Khai báo Schema list
const CustomerSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order'
    }],
    timeCreated: {
        type: Date,
        default: d.toLocaleString("en-us")
    },
    timeUpdated: {
        type: Date,
        default: d.toLocaleString("en-us")
    }
})

// export module customer model
module.exports = mongoose.model('Customer', CustomerSchema)