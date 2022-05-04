
// import mongoose
const mongoose = require('../../connectDB');
// Tạo Schema
const Schema = mongoose.Schema;
var d = new Date()
// Khai báo Schema Product Type
const ProductTypeSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description : {
        type: String
    },
    timeCreated: {
        type: Date,
        default: d.toLocaleString("en-us")
    },
    timeUpdated: {
        type: Date,
        default: d.toLocaleString("en-us")
    }
})

module.exports = mongoose.model('ProductType', ProductTypeSchema)