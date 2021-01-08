const NotFound = require('./not-found');
let notFoundHandler = (err, req, res, next) => {
    if(err instanceof NotFound){
        res.status(404).send("Ooops page not found 404 error");
        next();
    } else {
        next(err);
    }
};
module.exports = notFoundHandler;
