// Import Mongoose
const mongoose = require('mongoose');

// Import Customer Model
const CustomerModel = require('../models/CustomerModel');

// GET ALL CUSTOMER
const getAllCustomer = (request, response) => {
    CustomerModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal sever error",
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
// CREATE CUSTOMER
const createCustomer = (request, response) => {
    let fullName = request.body.fullName
    let phone = request.body.phone;
    let email = request.body.email;
    let address = request.body.address;
    let city = request.body.city;
    let country = request.body.country;
    // Validate email vs phone
    if (!email) {
        return response.status(400).json({
            status: "Bad Request",
            message: "email is required"
        })
    };
    if (!phone) {
        return response.status(400).json({
            status: "Bad Request",
            message: "phone is required"
        })
    }
    CustomerModel.create({
        _id: mongoose.Types.ObjectId(),
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        country: country
    }, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal sever error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Created",
                data: data
            })
        }
    })
}
// GET CUSTOMER BY ID
const getCustomerById = (request, response) => {
    // Tạo param id
    let customerId = request.params.customerId
    // Validate theo Id
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "customer Id is not valid"
        })
    }
    // Lấy UserModel lấy CSDL từ customerId và reponse ra
    CustomerModel.findById(customerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal Sever error",
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
                    status: "Not Found"
                })
            }
        }
    })
}
// UPDATE CUSTOMER BY ID
const updateCustomer = (request, response) => {
    // Tạo biến body cần nhập
    let fullName = request.body.fullName
    let phone = request.body.phone;
    let email = request.body.email;
    let address = request.body.address;
    let city = request.body.city;
    let country = request.body.country;
    // Tạo  customer Id
    let customerId = request.params.customerId
    // Validate customer Id
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: " customer Id is not valid "
        })
    }
    CustomerModel.findByIdAndUpdate(customerId, {
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        country: country
    }, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal Sever Error",
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
                    status: "Not Found"
                })
            }
        }
    })
}
//  DELETE CUSTOMER BY ID
const deleteCustomer = (request, response) => {
    // Tạo  customer Id
    let customerId = request.params.customerId;
    // Validate customer Id
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: " customer Id is not valid "
        })
    };
    CustomerModel.findByIdAndDelete(customerId, (error) => {
        if (error) {
            return response.status(500).json({
                status: "Internal Sever Error",
                message: error.message
            })
        } else {
            return response.status(204).json()
        }
    })
}


module.exports = {
    getAllCustomer,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}