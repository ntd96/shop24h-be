
const PrintProductMiddleware = (request, response, next) => {
    console.log('Request ProDuct success on', request.url)
    next();
}

module.exports = {PrintProductMiddleware}