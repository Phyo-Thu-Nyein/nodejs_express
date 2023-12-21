//own middleware
//stand between req and res, if no next(), cannot respond
exports.myLogger = (req, res, next) => {
    console.log("Hello from the middleware");
    next();
}

