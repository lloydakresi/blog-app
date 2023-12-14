const express = require('express');
const router = express.Router();
const sessionRouter = require('./sessionRoutes');
const userRouter = require('./userRoutes');
const blogRouter = require('./blogRoutes');

router.use('/api/session', sessionRouter);
router.use('/api/users', userRouter);
router.use('/api/blogs', blogRouter);

module.exports = router;
