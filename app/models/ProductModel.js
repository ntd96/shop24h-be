
// import monggose
const  mongoose = require('../../connectDB')
// Tạo Schema
const Schema = mongoose.Schema
//  Khai báo Schema list

const ProductSchema = new Schema ({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref : 'ProductType',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    amount: {
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

// import module Schema
module.exports = mongoose.model('Product', ProductSchema)