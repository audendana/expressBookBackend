const express = require('express');
const users = require('../fixtures/users');
const generateId = require('../lib/generate-id');
const jsonBodyParser = require('../lib/json-body-parser');
const NotFound = require('../lib/not-found');

let getUsersRoute = (req, res) => {
    res.send(users);
}

let getUserRoute = (req, res) => {
    let user = users.find(user => user.id === req.params.id);
    if(!user){throw new NotFound();}
    res.send(user);
}

let createUserRoute = async (req, res) => {
    let newUser = {...req.body, id:generateId()};
    users.push(newUser);
    res.status(201);
    res.send(newUser);
};
let updateUserRoute = async (req, res) => {
    let user = users.find(user => user.id === req.params.id);
    if(!user) {throw new NotFound();}
    Object.assign(user, req.body);
    res.status(200);
    res.send(user);
};

let deleteUserRoute = (req, res) => {
    let index = users.findIndex(user => user.id === req.params.id);
    if(index === -1) {throw new NotFound();}
    users.splice(index, 1);
    res.sendStatus(200);

};

let userRouter = express.Router();

userRouter.route('/')
    .get(getUsersRoute)
    .post(jsonBodyParser, createUserRoute)

userRouter.route('/:id')
    .get(getUserRoute)
    .patch(jsonBodyParser, updateUserRoute)
    .delete(deleteUserRoute)
module.exports = userRouter
