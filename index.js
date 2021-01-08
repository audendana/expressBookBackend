const express = require('express');
const usersRouter = require('./routes/users')
const emailsRouter = require('./routes/emails')
const logger = require('./lib/logger');
const notFoundHandler = require('./lib/notFoundHandler');

let app = express();
app.use(logger);
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(notFoundHandler);
app.listen(3000)
