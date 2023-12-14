const express = require('express');
const router = express.Router();
const sessionRouter = require('./sessionRoutes');
const userRouter = require('./userRoutes');
const blogRouter = require('./blogRoutes');
const { requireAuth } = require('../utils/auth');


router.get('/hello/world', (req, res)=> {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send(req.csrfToken());
});

router.use(requireAuth)

router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/blogs', blogRouter);






module.exports = router;
