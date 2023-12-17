const express = require('express');
const router = express.Router();
const { User } = require('../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];




//login route
router.post('/login', validateLogin, asyncHandler(async (req, res, next)=>{
    const {credential, password} = req.body;
    const user = await User.login({credential, password});

    if(!user){
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid'];
        return next(err);
    }

    const token = setTokenCookie(res, user);

    res.json({
        user, token
    })
}))

router.post('/signup', validateSignup, asyncHandler(async (req, res, next)=>{
    const {email, password, username} = req.body;
    const user = await User.signup({email, username, password});

    if(!user){
        const err = new Error('Signup failed');
        err.status = 401;
        err.title = 'Signup failed';
        err.errors = ['The provided credentials were invalid'];
        return next(err);
    }

    setTokenCookie(res, user);

    res.json({
        user,
    })
}))

//logout route
router.delete('/logout', (req, res)=>{
    res.clearCookie('token');
    res,json({message:'success'})
})

//restore user route
router.get('/restore', restoreUser, (req, res)=>{
    const {user} = req;
    if(user) return res.json({user: user.toSafeObject()});
    else return res.json({});
})




module.exports = router;
