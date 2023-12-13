const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const { environment } = require('.config/index');
const { ValidationError } = require('sequelize');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const isProduction = environment === 'production';
const app = express();

//Midlleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if(!isProduction){
    app.use(cors());
    //use cors only in development
}

app.use(helmet({crossOriginResourcePolicy: {
    policy: 'cross-origin'
}}));

app.use(
    csurf({
    cookie:{
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true,
    }
}));

app.use((req, res, next)=>{
    const error = new Error('The requested resource could not be found.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    if(err instanceof ValidationError){
        err.errors = err.errors.map((e)=>e.message);
        err.title = 'Validation error';
    }
    next(err);
})

app.use((err, req, res, next)=>{
    res.status = err.status || 500;
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
})


module.exports = app;
