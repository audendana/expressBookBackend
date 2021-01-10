const path = require('path')
const multer = require('multer');
const express = require('express')
const emails = require('../fixtures/emails');
const generateId = require('../lib/generate-id');
const bodyParser = require('body-parser');
const NotFound = require('../lib/not-found');
const requireAuth = require('../lib/require-auth');
const enforce = require('../lib/enforce');
let upload = multer({dest: path.join(__dirname, '../uploads')});
let getEmailsRoute = (req, res) => {
    res.send(emails);
}

let getEmailRoute = (req, res) => {
    let email = emails.find(email => email.id === req.params.id);
    if(!email) {throw new NotFound();}
    res.send(email);
}


let createEmailRoute = async (req, res) => {
    let attachments = (req.files ||[]).map(file => '/uploads' + file.filename);
    let newEmail = {...req.body, id:generateId(), attachments};
    emails.push(newEmail);
    res.status(201)
    res.send(newEmail);
}

let updateEmailRoute = async (req, res) => {
    let email = emails.find(email => email.id === req.params.id);
    if(!email) {throw new NotFound();}
    req.authorize(email);
    let newAttachment = (req.files || []).map(file => '/uploads' + file.filename);
    req.body.attachments = {...email.attachments, ...newAttachment};
    Object.assign(email, req.body);
    res.status(200);
    res.send(email);
};

let deleteEmailRoute = (req, res) => {
    let email = emails.find(email => email.id === req.params.id);
    if(!email) {throw new NotFound();}
    req.authorize(email);
    let index = emails.findIndex(email => email.id === req.params.id);
    if(index === -1) {throw new NotFound();}
    emails.splice(index, 1);
    res.sendStatus(204);
};

let updateEmailPolicy = (user, email) => {
    return user.id === email.from;
}

let deleteEmailPolicy = (user, email) => {
    return user.id === email.to;
}



let emailsRouter = express.Router();
emailsRouter.use(requireAuth);
emailsRouter.route('/')
    .get(getEmailsRoute)
    .post(bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        upload.array('attachments'),
        createEmailRoute);

emailsRouter.route('/:id')
    .get(getEmailRoute)
    .patch(
        enforce(updateEmailPolicy),
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        upload.array('attachments'),
        updateEmailRoute)
    .delete(enforce(deleteEmailPolicy), deleteEmailRoute);

module.exports = emailsRouter;
