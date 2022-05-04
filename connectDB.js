const { default: mongoose } = require("mongoose");

// Kết nối mongoose DB
mongoose.connect('mongodb+srv://data-shop24h:kinggoro1996@cluster0.qgzcc.mongodb.net/data-shop24h?retryWrites=true&w=majority', (error) => {
    if (error)
        throw error;
    console.log('Successfully connected MongoDb')
});

module.exports = mongoose