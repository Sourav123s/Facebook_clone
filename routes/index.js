const express =require('express');
const router=express.Router();

router.use(require('./user'));

router.use(require('./post'));

module.exports=router;