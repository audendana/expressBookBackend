const users = require('../fixtures/users');

let findUserByCredentials = ({username, password}) => {
    return users.find(user => user.username === username &&
        user.password === password);
};

exports.byCredentials = findUserByCredentials;