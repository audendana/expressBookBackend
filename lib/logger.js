const morgan = require("morgan");
let logger = (req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next()
};

module.exports = logger;
