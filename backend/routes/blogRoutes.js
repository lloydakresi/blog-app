const express = require('express');
const router = express.Router();
const { Blog, User } = require('../db/models');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const validateBlog = [
    check('title')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 }),

    check('content')
      .exists({ checkFalsy: true })
      .isLength({ min: 1, max: 2000 }),

    check('imageUrls')
      .exists({ checkFalsy: true })
      .isArray(),

    handleValidationErrors
  ];

//get all blogs
router.get('/', asyncHandler(async (req, res)=>{
    const blogs = await Blog.findAll({
        include: User,
        order: [['createdAt', 'DESC']]
    });
    res.json({blogs});
}))


//get one blog
router.get('/:id', asyncHandler(async (req, res)=>{
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId, {
        include: User
    });
    res.json({blog});
}))

//create blog
router.post('/', validateBlog, asyncHandler(async (req, res)=>{
    const {title, content, userId, imageUrls} = req.body;
    const blog = await Blog.create({title, content, userId, imageUrls});
    res.json({blog});
}))

//update blog
router.put('/:id', validateBlog, asyncHandler(async (req, res)=>{
    const blogId = req.params.id;
    const {title, content, userId, imageUrls} = req.body;
    const blog = await Blog.updateBlog({id: blogId, title, content, userId, imageUrls});
    res.json({blog});
}))

//delete blog
router.delete('/:id', asyncHandler(async (req, res)=>{
    const blogId = req.params.id;
    const blog = await Blog.deleteBlog({id: blogId});
    res.json({blog});
}))

module.exports = router;
