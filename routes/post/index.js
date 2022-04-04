const express=require('express');
const router=express.Router();
const Post=require('../../controller/post')
const User=require('../../controller/user')

router.post('/create-post',Post.createPost)
router.post('/like',User.verifyjwtToken,Post.increaseLike)
router.post('/dislike',User.verifyjwtToken,Post.decreaseLike)
module.exports = router