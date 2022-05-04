const PrintCustomerMiddleware = (request, response, next) => {
    console.log('Request Customer Success on', request.url );
    
    next()
}

module.exports = { PrintCustomerMiddleware }