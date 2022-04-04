const express=require('express');
const router= express.Router();

const User=require('../../controller/user');

router.post('add-user',User.addUser);

router.post('/signin',User.signIn);

router.post('/user-details',User.verifyjwtToken,User.userProfile)