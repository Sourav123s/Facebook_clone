const Friends = require('../../models').friends;
const Friend_request = require('../../models').friend_request;
const User = require('../../models').user;


async function sendFriendRequest(req, res) {
    try {
        const rb = req.body;
        const { id } = req.user;


        let check=await Friend_request.findOne({
            where:{
                request_send_by: id,
                request_recived_by: rb.user_id,  
            }
        })

        let checkTheyAreFriendOrNot =await Friends.findOne({
            where:{
                Person_1 :rb.user_id,
                Person_2:id
            }
        })

        if (check || checkTheyAreFriendOrNot){
            return res.json({
                success:false,
                message:'You already send Friend Request or friends'
            })
        }


        let friendRequest = await Friend_request.create({
            request_send_by: id,
            request_recived_by: rb.user_id,
            request_status: 'P'
        })

        if (friendRequest) {
            return res.json({
                success: true,
                message: 'Friend Request send sucessfully',
                data: friendRequest
            })
        }



    } catch (error) {
        console.log(error)
    }
}


async function acceptFriendRequest(req, res) {
    try {
        const rb = req.body;

        let recivedFriendRequest = await Friend_request.update({
            request_status: 'R'
        }, {
            where: { id: rb.request_id }
        })
        if (!recivedFriendRequest) {
            return res.json({
                success: true,
                message: 'Something Went Wrong ',
                // data: recivedFriendRequest
            })
        }
        let findRequest = await Friend_request.findOne({
            where: {
                id: rb.request_id,
            }
        })


        let friend = await Friends.create({
            Person_1: findRequest.request_recived_by,
            Person_2: findRequest.request_send_by,
            Time_Stamp: new Date()
        });

        if (friend) {
            return res.json({
                success: true,
                message: 'Request recived ',
                data: friend
            })

        }


    } catch (error) {
        console.log(error);
    }
}


async function rejectFriendRequest(req, res) {

    try {
        const rb = req.body

        let rejectFriendRequest = await Friend_request.destroy({
            where: {
                id: rb.request_id
            }
        })

        if (rejectFriendRequest) {
            return res.json({
                success: true,
                message: 'Request reject',
                data: rejectFriendRequest
            })
        }

    } catch (error) {
        console.log(error);
    }
}


async function addFriends(req, res) {
    try {
        const { user_id } = req.body;
        const { id } = req.user;
        let timeStamp = new Date();
        let user = await User.findOne({
            where: {
                id: user_id
            }
        })
        let friend = await Friends.create({
            Person_1: id,
            Person_2: user_id,
            Time_Stamp: timeStamp
        });

        if (friend) {
            return res.json({
                success: true,
                message: 'you are now connected to this',
                data: { user, friend }
            })
        }

    } catch (err) {
        console.log(err);
    }
}

async function unFriend(req, res) {
    try {
        const { user_id } = req.body;
        const { id } = req.user;
        let timeStamp = new Date();

        let unFriend = await Friends.destroy({
            Person_1: id,
            Person_2: user_id,

        });

        if (unFriend) {
            return res.json({
                success: true,
                message: 'unfriend',

            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addFriends,
    unFriend,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
}