
// Import mongoose

const mongoose = require('mongoose');
// Import Product Model
const ProductModel = require('../models/ProductModel');

// GET ALL PRODUCT
const getAllProduct = (request, response) => {

    
    ProductModel.find(condition,(error, data) => {
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
// CREATE PRODUCT
const createProduct = (request, response) => {
    // Tạo các biến cho create body
    let name = request.body.name;
    let description = request.body.description;
    let type = request.body.type;
    let imageUrl = request.body.imageUrl;
    let buyPrice = request.body.buyPrice;
    let promotionPrice = request.body.promotionPrice;
    let amount = request.body.amount
    // Validate required
    if (!name) {
        return response.status(400).json({
            status: "Bad Request",
            message: "name is required"
        })
    }
    if (!type) {
        return response.status(400).json({
            status: "Bad Request",
            message: "type is required"
        })
    }
    if (!imageUrl) {
        return response.status(400).json({
            status: "Bad Request",
            message: "imageUrl is required"
        })
    }
    if (!buyPrice) {
        return response.status(400).json({
            status: "Bad Request",
            message: "buyPrice is required"
        })
    }
    if (!promotionPrice) {
        return response.status(400).json({
            status: "Bad Request",
            message: "promotionPrice is required"
        })
    }
    ProductModel.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
        description: description,
        type: type,
        imageUrl: imageUrl,
        buyPrice: buyPrice,
        promotionPrice: promotionPrice,
        amount: amount,
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
// GET PRODUCT BY ID
const getProductById = (request, response) => {
    // Tạo biến Id
    let productId = request.params.productId;
    // Validate Id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Product Id is not valid"
        })
    }
    ProductModel.findById(productId, (error, data) => {
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
// UPDATE PRODUCT BY ID
const updateProduct = (request, response) => {
    let name = request.body.name;
    let description = request.body.description;
    let type = request.body.type;
    let imageUrl = request.body.imageUrl;
    let buyPrice = request.body.buyPrice;
    let promotionPrice = request.body.promotionPrice;
    let amount = request.body.amount;
    // Tạo biến ID
    productId = request.params.productId;
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "Order Id is not valid"
        })
    }
    ProductModel.findByIdAndUpdate(productId, {
        name: name,
        description: description,
        type: type,
        imageUrl: imageUrl,
        buyPrice: buyPrice,
        promotionPrice: promotionPrice,
        amount: amount,
    }, (error, data) => {
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
// DELETE PRODUCT BY ID
const deleteProduct = (request, response) => {
    // Tạo biến Id
    let productId = request.params.productId;
    // Validate productIT
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            status: "Bad request",
            message: "order Id is not valid"
        })
    }
    ProductModel.findByIdAndDelete(productId, (error) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(204).json()
        }
    })
}

// GET PRODUCT LIMIT
const getProductsLimit = (request, response) => {
    // Tạo request query
    let {skip,limit, name, min, max, type } = request.query;
    console.log(limit)
    const condition = {}
   
    // Lọc theo name
    if(name) {
        const regex = new RegExp(`${name}`)
        condition.name = regex
    }
    // Lọc Type
    // if(type !== undefined && !Array.isArray(type)) {
    //     type = [type]
    // }
    // if(Array.isArray(type)) {
    //     condition.type = {
    //         $in: type
    //     }
    // }
    // Lọc Type
    if(type) {
        condition.type = type
    }

    // Lọc theo min
    if(min) {
        condition.promotionPrice = {
            ...condition.promotionPrice,
            $gte: min
        }
    }
    if(max) {
        condition.promotionPrice = {
            ...condition.promotionPrice,
            $lte: max
        }
    }

    ProductModel.find(condition).skip(skip).limit(limit).exec((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal sever error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success",
                data: data
            })
        }
    })
}


// export
module.exports = {
    getAllProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsLimit
}