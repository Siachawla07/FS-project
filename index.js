const express=require('express')
const router =express.Router();
//const { createBlog } = require('../Controllers/Blogcontroller');

const blogRoutes= require('./BlogRouter');
const Registerrouter = require('./Registerrouter')

router.use('/blog',blogRoutes);
router.use('/auth',Registerrouter);

module.exports = router;
