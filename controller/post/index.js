const Post=require('../../models').Post

async function createPost(req, res) {
    try {
        const rb = req.body
        await Post.create({

        })

    } catch (error) {

    }
}

module.exports={
    createPost
}