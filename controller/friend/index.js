const Friends = require('../../models').friends
const User = require('../../models').user;


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
        let user = await User.findOne({
            where: {
                id: user_id
            }
        })
        let unFriend = await Friends.destroy({
            Person_1: id,
            Person_2: user_id,
            
        });

        if (unFriend){
            return res.json({
                success:true,
                message: 'unfriend',

            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addFriends,
    unFriend
}