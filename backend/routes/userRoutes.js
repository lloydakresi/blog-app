const express = require('express');
const router = express.Router();
const { User } = require('../db/models');
const asyncHandler = require('express-async-handler');



//get your blogs
router.get('/:id/blogs', asyncHandler(async (req, res)=>{
    const userId = req.params.id;
    const blogs = await User.getUserBlogs({id: userId});
    res.json({blogs});
}))

router.get('/', asyncHandler(async (req, res)=>{
    const users = await User.findAll();
    res.json({
        users
    })
}))

module.exports = router;
