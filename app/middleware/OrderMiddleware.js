const printOrderMiddleware = (request, response, next) => {
    console.log('Request Order Success on', request.url);
    
    next();
}
module.exports = { printOrderMiddleware }