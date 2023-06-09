const express = require('express');
const moviesRouter = require('./moviesRouter');
const commentsRouter = require('./commentsRouter');
const sessionsRouter = require('./sessionsRouter');
const theaterRouter = require('./theatersRouter');
const usersRouter = require('./usersRouter');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/movies',moviesRouter); //La app que creamos con express va a asociar la ruta movies
    router.use('/comments',commentsRouter);
    router.use('/sessions',sessionsRouter);
    router.use('/theaters',theaterRouter);
    router.use('/users',usersRouter);
}

module.exports = routerApi;


