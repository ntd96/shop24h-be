// import mongoose
const { response } = require('express');
const { request } = require('express');
const mongoose = require('mongoose');

// Import Order Model
const OrderModel = require('../models/OrderModel');
// Import Customer Model
const CustomerModel = require('../models/CustomerModel')

// let today = new Date
let shipday = new Date()

// GET ALL ORDER
const getAllOrder = (request, response) => {
    OrderModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success",
                data: data
            })
        }
    })
}
// CREATE ORDER OF CUSTOMER
const createOrderOfCustomer = (request, response) => {
    // Tạo biến nhập body
    let note = request.body.note;  //String
    let cost = request.body.cost;  //Number
    // Tạo Id Customer Model, ref: Order
    let customerId = request.params.customerId;
    // Validate Customer Id
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "customer ID is not valid"
        })
    }
    OrderModel.create({
        _id: mongoose.Types.ObjectId(),
        shippedDate: shipday.setDate(shipday.getDate() + 5),
        note: note,
        cost: cost
    }, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            CustomerModel.findByIdAndUpdate(customerId, {
                $push: { orders: data._id }
            }, (err, data) => {
                if (err) {
                    return response.status(500).json({
                        status: "Internal server error",
                        message: err.message
                    })
                } else {
                    return response.status(201).json({
                        status: "Created",
                        data: data
                    })
                }
            })

        }
    })
}
// GET ALL ORDER OF CUSTOMER
const getAllOrderOfCustomer = (request, response) => {
    // Tạo Id Customer Model, ref: Order
    let customerId = request.params.customerId;
    // Validate id customer
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Course Id is not valid"
        })
    }
    CustomerModel.findById(customerId)
        .populate("orders")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Success",
                    data: data.orders
                })
            }
        })
}
// GET ORDER BY ID
const getOrderById = (request, response) => {
    // Tạo Id Customer Model, ref: Order
    let orderId = request.params.orderId;
    // Validate Customer Id
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "orderId is not valid"
        })
    }
    OrderModel.findById(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            if (data) {
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            } else {
                return response.status(404).json({
                    status: "Not found"
                })
            }

        }
    })
}
// DELETE ORDER BY ID
const deleteOrderById = (request, response) => {
    // Tạo Id Order
    let orderId = request.params.orderId;
    // Tạo Id customer REF
    let customerId = request.params.customerId;
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "order Id is not valid"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "customerId is not valid"
        })
    }
    OrderModel.findByIdAndDelete(orderId, (error) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            CustomerModel.findByIdAndUpdate(customerId, {
                $pull: { orders: orderId }
            }, (err) => {
                if (err) {
                    return response.status(500).json({
                        status: "Internal sever error"
                    })
                } else {
                    return response.status(204).json()
                }
            })

        }
    })
}

module.exports = {
    getAllOrder,
    createOrderOfCustomer,
    getAllOrderOfCustomer,
    getOrderById,
    deleteOrderById
}