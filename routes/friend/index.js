const express = require('express');
const router = express.Router();
const Friends=require('../../controller/friend')
const User = require('../../controller/user')

router.post('/add-friend',User.verifyjwtToken,Friends.addFriends)
router.post('/send-friend-request',User.verifyjwtToken,Friends.sendFriendRequest);
router.post('/accept-friend-request', User.verifyjwtToken, Friends.acceptFriendRequest)
router.post('/reject-friend-request', User.verifyjwtToken, Friends.rejectFriendRequest)

module.exports=router