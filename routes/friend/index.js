const express = require('express');
const router = express.Router();
const Friends=require('../../controller/friend')
const User = require('../../controller/user')

router.post('/add-friend',User.verifyjwtToken,Friends.addFriends)

module.exports=router