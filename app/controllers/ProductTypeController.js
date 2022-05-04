
// Import mongoose
const { request } = require('express');
const { response } = require('express');
const mongoose = require('mongoose');

const ProductTypeModel = require('../models/ProductTypeModel');

// GET ALL PRODUCT TYPE
const getAllProductType = (request, response) => {

    ProductTypeModel.find((err, data) => {
        if (err) {
            return response.status(500).json({
                status: 'Internal sever error',
                message: err.message
            })
        } else {
            return response.status(200).json({
                status: 'Success',
                data: data
            })
        }
    })
}
// CREATE PRODUCT TYPE - POST
const createProductType = (request, response) => {
    let name = request.body.name;
    let description = request.body.description;

    // Xét điều kiện require
    if (!name) {
        return response.status(400).json({
            status: 'Bad request',
            message: 'Name is required'
        })
    }
    ProductTypeModel.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
        description: description
    }, (err, data) => {
        if (err) {
            return response.status(500).json({
                status: 'Internal sever error'
            })
        } else {
            return response.status(201).json({
                status: 'Created',
                data: data
            })
        }
    })
}
// GET PRODUCT BY ID
const getProductTypeByID = (request, response) => {
    // Tạo Id
    let producttypeId = request.params.producttypeId
    // Validate Id ProductType
    if (!mongoose.Types.ObjectId.isValid(producttypeId)) {
        return response.status(400).json({
            status: 'Bad Request',
            message: 'Product Type is not valid'
        })
    }
    ProductTypeModel.findById(producttypeId, (error, data) => {
        // Trường hợp nhập sai syntax thì lỗi code 500
        if (error) {
            return response.status(500).json({
                status: 'Internal sever error',
                message: error.message
            })
        } else {
            // Nhập đúng id thì trả ra data
            if (data) {
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
                // Nhập sai id thì trả ra kết quả none
            } else {
                return response.status(404).json({
                    status: "Not Found"
                })
            }
        }
    })
}
// UPDATE PRODUCT BY ID
const updateProductType = (request, response) => {
    // Tạo biến Id
    let producttypeId = request.params.producttypeId
    // Validate productTypeId
    if (!mongoose.Types.ObjectId.isValid(producttypeId)) {
        return response.status(400).json({
            status: 'Bad Request',
            message: 'Product Type is not valid'
        })
    }
    // Tạo các biến key-value để update
    let name = request.body.name;
    let description = request.body.description;
    ProductTypeModel.findByIdAndUpdate(producttypeId, {
        name: name,
        description: description
    }, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: 'Internal sever error',
                message: error.message
            })
        } else {
            if(data) {
                return response.status(200).json({
                    status: 'Success',
                    data: data
                })
            } else {
                return response.status(404).json({
                    status: 'Not Found'
                })
            }
        }
    })
}
// DELETE PRODUCT BY ID
const deleteProductType = (request, response) => {
    // Tạo biến id
    let producttypeId = request.params.producttypeId
    // Validate Id
    if(!mongoose.Types.ObjectId.isValid(producttypeId)) {
        return response.status(500).json({
            status: 'Bad Request',
            message: 'Product Type is not valid'
        })
    }
    ProductTypeModel.findByIdAndDelete(producttypeId, (error) => {
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
    getAllProductType,
    createProductType,
    getProductTypeByID,
    updateProductType,
    deleteProductType
}