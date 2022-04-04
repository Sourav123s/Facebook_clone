const Post = require('../../models').post
const PostLikeByUser = require('../../models').post_like_by_user

async function createPost(req, res) {
    try {
        const rb = req.body;
        const currentDate = new Date();
        const post = await Post.create({
            Title: rb.Title,
            Created_By: rb.user_id,
            Date_Of_Creation: currentDate,
            Likes: 0
        })
        if (post) {
            return res.json({
                success: true,
                message: 'post sucessfully created  ',
                data: post
            })
        } else {
            return res.json({
                success: false,
                message: 'something went wrong ',

            })
        }

    } catch (error) {
        console.log(error);
    }
}

async function increaseLike(req, res) {
    try {
        const rb = req.body;
        const user = req.user;


        const post = await Post.findOne({
            where: {
                id: rb.Post_Id
            }
        })

        let previousLike = post.Likes;
        let presaentLike = previousLike + 1;
        await Post.update({
            Likes: presaentLike,

        }, {
            where: {
                id: post.id
            }
        });

        let postLikeBy = await PostLikeByUser.create({
            Post_Id: post.id,
            Post_Created_By: post.Created_By,
            Post_Liked_By: user.id
        });

        if (postLikeBy) {
            return res.json({
                success: true,
                message: 'increase the like in post sucessfully',
                data: postLikeBy
            })
        }

    } catch (error) {
        console.log(error);
    }
}

async function decreaseLike(req, res) {
    try {
        const rb = req.body;
        const user = req.user;

        const post = await Post.findOne({
            where: {
                id: rb.Post_Id
            }
        })
        let delLikeData = await PostLikeByUser.destroy({
            where: {
                Post_Id: post.id,
                Post_Created_By: post.Created_By,
                Post_Liked_By: user.id
            }
        })

        if (delLikeData) {

            let previousLike = post.Likes;
            let presaentLike = previousLike -1;

            await Post.update({
                Likes: presaentLike,

            }, {
                where: {
                    id: post.id
                }
            });
            return res.json({
                success: true,
                message: 'post unlike sucessfully'
            })
        } else {
            return res.json({
                success: false,
                message: 'something went wrong '
            })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createPost,
    increaseLike,
    decreaseLike
}