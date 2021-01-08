const path = require('path');
const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');
const usersRouter = require('./routes/users')
const emailsRouter = require('./routes/emails')
const logger = require('./lib/logger');
const notFoundHandler = require('./lib/notFoundHandler');

let app = express();
app.use(logger);
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(notFoundHandler);
app.listen(3000)
