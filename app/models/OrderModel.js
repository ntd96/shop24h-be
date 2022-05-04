// Import mongoose
const mongoose = require('../../connectDB');
// Tạo Schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shippedDate: {
        type: Date
    },
    note: {
        type: String
    },
    orderDetail: [

    ],
    cost: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
})

// export Order
module.exports = mongoose.model('Order', OrderSchema )