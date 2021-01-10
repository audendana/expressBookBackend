const users = require('../fixtures/users');

let basicAuth = (findUserByCredentials) => (req, res, next) => {
    let header =req.headers.authorization || '';
    let[type, payload] = header.split(' ');
    console.log(type, payload);
    if(type === 'Basic'){
        let credentials = Buffer.from(payload, 'base64').toString('ascii');
        let [username, password] = credentials.split(':');
        console.log(username, password);
        let user = findUserByCredentials({username, password});
        console.log(user)
        if(user){
            req.user = user;
        } else {
            res.sendStatus(401);
            return;
        }
    }
    next();
};
module.exports = basicAuth;