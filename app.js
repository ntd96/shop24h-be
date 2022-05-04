const { response } = require('express');
const { request } = require('express');
// Import Express
const express = require('express')
// Tạo app
const app = express();
// Khai cổng port
const port = process.env.PORT || 8888;

// Import Mongoose
const mongoose = require('mongoose')

// Import Model để mongoDb nhận Model - TẠM DÙNG
const ProductTypeSchema = require('./app/models/ProductTypeModel');
const ProductSchema = require('./app/models/ProductModel');
const CustomerModel = require('./app/models/CustomerModel');
const OrderModel = require('./app/models/OrderModel');

// Cấu hình API đọc được body Json
app.use(express.json());
// Cấu hình API đọc được body có kí tự tiếng việt
app.use(express.urlencoded({
    extended: true
}));

// Xử lí việc bảo mật 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Import Router Product Type
const ProductTypeRouter = require('./app/routers/ProductTypeRouter');
// Import Router Product
const ProductRouter = require('./app/routers/ProductRouter');
// Import Router Customer
const CustomerRouter = require('./app/routers/CustomerRouter');
// Import Router Order
const OrderRouter = require('./app/routers/OrderRouter');

// Sử dụng app router
app.use('/', ProductTypeRouter)
app.use('/', ProductRouter)
app.use('/', CustomerRouter)
app.use('/', OrderRouter)

// Listen
app.listen(port, () => {
    console.log(`App listenning on ${port}`)
});